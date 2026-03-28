// src/commands/chat.ts
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { MessageParam } from '@anthropic-ai/sdk/resources/messages/messages.mjs';
import { ClaudeService } from '../services/claude';
import { tools } from '../tools/definitions';
import { ToolExecutor } from '../tools/toolExecuter'
import logger from '../utils/logger';

export const chat = new Command('chat')
  .description('Start a chat session with Claude')
  .option('-s, --session <id>', 'Continue an existing session')
  .option('--no-tools', 'Disable tool usage')
  .option('--list-tools', 'List available tools')
  .action(async (options) => {
    // Display available tools if requested
    if (options.listTools) {
      console.log(chalk.blue('\nAvailable Tools:'));
      Object.entries(tools).forEach(([name, tool]) => {
        console.log(chalk.green(`\n${name}:`));
        console.log(chalk.gray(`Description: ${tool.description}`));
        console.log(chalk.gray('Parameters:'));
        Object.entries(tool.input_schema?.properties || {}).forEach(([param, details]) => {
          console.log(chalk.gray(`  - ${param}: ${(details as any).description}`));
        });
      });
      return;
    }

    // Initialize services
    const claude = new ClaudeService();
    const toolExecutor = new ToolExecutor();

    // Print welcome message and available tools
    console.log(chalk.blue('\nClaude CLI Chat'));
    console.log(chalk.gray('Type "exit" to end the session'));
    if (options.tools) {
      console.log(chalk.gray('Available tools:'));
      console.log(chalk.gray('1. Email: "Send an email to user@example.com with subject \'Hello\'"'));
      console.log(chalk.gray('2. Stocks: "What\'s the current price of AAPL?" or "Show me TSLA stock details"'));
      console.log(chalk.gray('3. Weather: "What\'s the weather in New York?" or "Is it raining in London?"\n'));
    }

    const messages: MessageParam[] = [];
    let sessionActive = true;

    while (sessionActive) {
      const { input } = await inquirer.prompt({
        type: 'input',
        name: 'input',
        prefix: chalk.green('You:'),
        message: ' '
      });

      if (input.toLowerCase() === 'exit') {
        console.log(chalk.blue('Goodbye!'));
        break;
      }

      const spinner = ora('Claude is thinking...').start();

      try {
        messages.push({ role: 'user', content: input });

        // Initial response from Claude
        const response = await claude.createMessage(
          messages,
          "",
          options.tools ? Object.values(tools) : undefined
        );

        // Handle tool use if present
        const toolUseBlocks = ClaudeService.getToolUseBlocks(response.content);

        if (toolUseBlocks.length > 0 && options.tools) {
          spinner.text = 'Executing tools...';

          // Add the assistant's response (with tool_use blocks) to conversation
          messages.push({ role: 'assistant', content: response.content });

          // Execute each tool and collect results
          const toolResults = [];
          for (const toolUseBlock of toolUseBlocks) {
            spinner.text = `Executing ${toolUseBlock.name}...`;
            const result = await toolExecutor.executeToolCall(toolUseBlock);
            toolResults.push(result);
          }

          // Send tool results back to Claude as a single user message with tool_result blocks
          const toolResultMessage = ClaudeService.buildToolResultMessage(
            toolResults.map(r => ({
              tool_use_id: r.tool_use_id,
              content: r.content,
              is_error: r.is_error,
            }))
          );
          messages.push(toolResultMessage);

          // Get final response after tool execution
          const finalResponse = await claude.createMessage(
            messages,
            "",
            Object.values(tools)
          );
          spinner.stop();

          const responseText = ClaudeService.getTextContent(finalResponse.content);
          console.log(chalk.blue('\nClaude:'), responseText);

          // Display formatted tool results
          for (const result of toolResults) {
            if (result.is_error) continue;
            const data = JSON.parse(result.content);

            if (result.name === 'get_stock_price') {
              console.log(chalk.gray('\nStock Information:'));
              console.log(chalk.gray(`Price: $${data.price}`));
              console.log(chalk.gray(`Change: ${data.change} (${data.changePercent})`));
              if (data.volume) {
                console.log(chalk.gray(`Volume: ${data.volume.toLocaleString()}`));
              }
            } else if (result.name === 'get_weather') {
              console.log(chalk.gray('\nWeather Information:'));
              console.log(chalk.gray(`Temperature: ${data.temperature}°${data.units === 'metric' ? 'C' : 'F'}`));
              console.log(chalk.gray(`Conditions: ${data.description}`));
              console.log(chalk.gray(`Humidity: ${data.humidity}%`));
            } else if (result.name === 'send_email') {
              console.log(chalk.gray('\nEmail Status:'));
              console.log(chalk.gray(data ? '✓ Email sent successfully' : '✗ Failed to send email'));
            }
          }

          // Add the final assistant response to the conversation
          messages.push({ role: 'assistant', content: finalResponse.content });
          console.log(); // Add blank line for readability
        } else {
          // Regular response without tool calls
          spinner.stop();
          const responseText = ClaudeService.getTextContent(response.content);
          console.log(chalk.blue('\nClaude:'), responseText, '\n');
          messages.push({ role: 'assistant', content: response.content });
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        spinner.fail('Error: ' + errorMessage);
        logger.error('Chat error:', error);
      }
    }
  });
