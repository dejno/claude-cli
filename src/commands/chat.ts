// src/commands/chat.ts
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
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

    interface ClaudeMessage {
      role: 'user' | 'assistant';
      content: string;
    }

    let messages: ClaudeMessage[] = [];
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
          Object.values(tools)
        );
        // Handle tool calls if present
        if (response.tool_calls && response.tool_calls.length > 0 && options.tools) {
          spinner.text = 'Executing tools...';

          for (const toolCall of response.tool_calls) {
            const { function: { name } } = toolCall;
            spinner.text = `Executing ${name}...`;

            try {
              const result = await toolExecutor.executeToolCall(toolCall);
              
              // Add the tool response to the conversation
              messages.push(
                { role: 'assistant', content: response.content[0]?.text || "" },
                { role: 'user', content: JSON.stringify(result.response) }
              );

              // Get final response after tool execution
              const finalResponse = await claude.createMessage(messages);
              spinner.stop();
              
              // Format and display the results based on tool type
              console.log(chalk.blue('\nClaude:'), finalResponse.content[0]?.text);
              
              if (name === 'get_stock_price') {
                const stockData = result.response;
                console.log(chalk.gray('\nStock Information:'));
                console.log(chalk.gray(`Price: $${stockData.price}`));
                console.log(chalk.gray(`Change: ${stockData.change} (${stockData.changePercent})`));
                if (stockData.volume) {
                  console.log(chalk.gray(`Volume: ${stockData.volume.toLocaleString()}`));
                }
              } else if (name === 'get_weather') {
                const weatherData = result.response;
                console.log(chalk.gray('\nWeather Information:'));
                console.log(chalk.gray(`Temperature: ${weatherData.temperature}°${weatherData.units === 'metric' ? 'C' : 'F'}`));
                console.log(chalk.gray(`Conditions: ${weatherData.description}`));
                console.log(chalk.gray(`Humidity: ${weatherData.humidity}%`));
              } else if (name === 'send_email') {
                console.log(chalk.gray('\nEmail Status:'));
                console.log(chalk.gray(result.response ? '✓ Email sent successfully' : '✗ Failed to send email'));
              }
              
              console.log(); // Add blank line for readability
            } catch (error: unknown) {
              const errorMessage = error instanceof Error ? error.message : String(error);
              spinner.fail(`Tool execution failed: ${errorMessage}`);
              logger.error(`Tool execution error:`, error);
              
              // Add error message to conversation
              messages.push({
                role: 'user',
                content: JSON.stringify({ error: error instanceof Error ? error.message : String(error) })
              });
            }
          }
        } else {
          // Regular response without tool calls
          spinner.stop();
          console.log(chalk.blue('\nClaude:'), response.content[0]?.text, '\n');
          messages.push({ role: 'assistant', content: response.content[0]?.text || ""});
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        spinner.fail('Error: ' + errorMessage);
        logger.error('Chat error:', error);
      }
    }
  });