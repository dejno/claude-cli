import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import config from '../config';
import { ClaudeService } from '../services/claude';

export const configure = new Command('configure')
  .description('Configure CLI settings')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'apiKey',
        message: 'Enter your Anthropic API key:',
        default: config.get('apiKey'),
      },
      {
        type: 'list',
        name: 'model',
        message: 'Select Claude model:',
        choices: [
          'claude-3-5-sonnet-20241022',
          'claude-3-5-opus-20241022'
        ],
        default: config.get('model')
      },
      {
        type: 'number',
        name: 'maxTokens',
        message: 'Set max tokens:',
        default: config.get('maxTokens')
      },
      {
        type: 'number',
        name: 'temperature',
        message: 'Set temperature (0-1):',
        default: config.get('temperature'),
        validate: (value) => value >= 0 && value <= 1
      }
    ]);

    // Save configuration
    config.set(answers);
    console.log(chalk.green('\nConfiguration saved successfully!'));

    // Test connection
    try {
      const claude = new ClaudeService(answers.apiKey);
      await claude.sendMessage('Test connection');
      console.log(chalk.green('✓ Connection to Claude API verified\n'));
    } catch (error) {
      console.error(chalk.red('✗ Failed to connect to Claude API:'), error instanceof Error ? error.message : String(error));
    }
  });