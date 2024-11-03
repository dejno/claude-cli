import { Command } from 'commander';
import chalk from 'chalk';
import { loadSessions, deleteSession } from '../utils/sessions';

export const sessions = new Command('sessions')
  .description('Manage chat sessions')
  .option('-l, --list', 'List all sessions')
  .option('-d, --delete <id>', 'Delete a session')
  .action(async (options) => {
    if (options.delete) {
      deleteSession(options.delete);
      console.log(chalk.green(`Session ${options.delete} deleted successfully`));
    } else {
      const sessions = loadSessions();
      console.log(chalk.blue('\nChat Sessions:\n'));

      sessions.forEach(session => {
        console.log(chalk.bold(`${session.name} (${session.id})`));
        console.log(chalk.gray(`Created: ${new Date(session.created).toLocaleString()}`));
        console.log(chalk.gray(`Messages: ${session.messages.length}`));
        console.log();
      });
    }
  });