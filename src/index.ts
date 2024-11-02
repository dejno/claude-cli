#!/usr/bin/env node
import { program } from 'commander';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { chat } from './commands/chat';
import { configure } from './commands/configure';
import { sessions } from './commands/sessions';
import { env } from './config/env';
import logger from './utils/logger';
import { handleError } from './utils/errors';
import { validateApiKey } from './utils/validators';
import config from './config';

async function main() {
  try {
    // Load environment variables
    dotenv.config();

    // Initialize error handlers
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught exception:', error);
      console.error(chalk.red('Fatal error:'), error.message);
      process.exit(1);
    });

    process.on('unhandledRejection', (error) => {
      logger.error('Unhandled rejection:', error);
      console.error(chalk.red('Promise rejection:'), error);
      process.exit(1);
    });

    // Check for API key
    const apiKey = config.get('apiKey') || env.ANTHROPIC_API_KEY;
    if (!apiKey || !validateApiKey(apiKey)) {
      console.log(chalk.yellow('API key not configured. Running setup...'));
      await configure.parseAsync(process.argv);
      return;
    }

    // Set up CLI program
    program
      .name('claude')
      .description('Anthropic Claude API CLI Tool')
      .version('1.0.0', '-v, --version', 'Output the current version')
      .addCommand(chat)
      .addCommand(configure)
      .addCommand(sessions);

    // Add global options
    program
      .option('-d, --debug', 'Enable debug mode')
      .option('-q, --quiet', 'Suppress output')
      .hook('preAction', (thisCommand) => {
        // Set logging level based on options
        if (thisCommand.opts().debug) {
          logger.level = 'debug';
          logger.debug('Debug mode enabled');
        }
        if (thisCommand.opts().quiet) {
          logger.silent = true;
        }
      });

    // Show help if no arguments provided
    if (process.argv.length === 2) {
      program.outputHelp();
      return;
    }

    // Parse command line arguments
    await program.parseAsync(process.argv);
  } catch (error: unknown) {
    handleError(error as Error);
    process.exit(1);
  }
}

// Start the CLI
main().catch((error) => {
  console.error(chalk.red('Failed to start CLI:'), error.message);
  logger.error('CLI startup error:', error);
  process.exit(1);
});