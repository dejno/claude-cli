// src/utils/help.ts
import chalk from 'chalk';

export function showHelp(): void {
  console.log(chalk.bold('\nAvailable Commands:'));
  console.log(chalk.gray('─────────────────────'));
  console.log('exit          End the chat session');
  console.log('help          Show this help message');
  console.log('clear         Clear the screen');
  console.log('save          Save the current session');
  console.log('history       Show message history');
  console.log('settings      Show current settings');
  console.log();
}
