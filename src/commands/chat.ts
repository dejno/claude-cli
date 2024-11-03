import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { ClaudeService } from '../services/claude';
import logger from '../utils/logger';
import { ChatSession } from '../types';
import { loadSession, createSession, saveSession } from '../utils/sessions';
import { showHelp } from '../utils/help';
import { env } from '../config/env';

export const chat = new Command('chat')
  .description('Start a chat session with Claude')
  .option('-s, --session <id>', 'Continue an existing session')
  .option('--stream', 'Enable streaming responses', env.STREAM_OUTPUT)
  .action(async (options) => {
    const claude = new ClaudeService();
    let session: ChatSession;

    if (options.session) {
      // Load existing session
      session = loadSession(options.session);
    } else {
      // Create new session
      session = createSession();
    }

    console.log(chalk.blue(`Chat session: ${session.name}`));
    console.log(chalk.gray('Type "exit" to end the session, "help" for commands\n'));

    while (true) {
      const { message } = await inquirer.prompt({
        type: 'input',
        name: 'message',
        prefix: chalk.green('You:'),
        message: ' '
      });

      if (message.toLowerCase() === 'exit') break;
      if (message.toLowerCase() === 'help') {
        showHelp();
        continue;
      }

      const spinner = ora('Claude is thinking...').start();
      
      try {
        let response: string = '';

        if (options.stream) {
          spinner.stop();
          process.stdout.write(chalk.blue('Claude: '));
          
          await claude.streamMessage(
            message,
            session.messages,
            chunk => {
              response += chunk;
              process.stdout.write(chunk);
            }
          );

          process.stdout.write('\n\n');
        } else {
          response = await claude.sendMessage(message, session.messages);
          spinner.stop();
          console.log(chalk.blue('Claude:'), response, '\n');
        }

        // Update session
        session.messages.push(
          { role: 'user', content: message, timestamp: Date.now() },
          { role: 'assistant', content: response, timestamp: Date.now() }
        );
        session.lastUpdated = Date.now();
        saveSession(session);

      } catch (error) {
        spinner.fail('Error communicating with Claude');
        logger.error('Chat error:', error);
        console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      }
    }

    console.log(chalk.blue('\nChat session ended'));
  });