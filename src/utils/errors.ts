import chalk from "chalk";
import logger from "./logger";

export class CliError extends Error {
    constructor(
      message: string,
      public code: string,
      public details?: any
    ) {
      super(message);
      this.name = 'CliError';
    }
  }
  
  export function handleError(error: Error): void {
    if (error instanceof CliError) {
      console.error(chalk.red(`Error [${error.code}]: ${error.message}`));
      if (error.details) {
        console.error(chalk.gray('Details:'), error.details);
      }
    } else {
      console.error(chalk.red('Unexpected error:'), error.message);
    }
    
    logger.error('Error occurred:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  }