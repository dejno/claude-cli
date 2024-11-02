// src/utils/prompts.ts
import inquirer from 'inquirer';
import { loadSessions } from './sessions';
import { formatDuration } from './formatting';

export async function selectSession(): Promise<string> {
  const sessions = loadSessions();
  
  if (sessions.length === 0) {
    throw new Error('No sessions found');
  }

  const { sessionId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'sessionId',
      message: 'Select a session:',
      choices: sessions.map(session => ({
        name: `${session.name} (${formatDuration(Date.now() - session.lastUpdated)})`,
        value: session.id
      }))
    }
  ]);

  return sessionId;
}

export async function confirmDeletion(sessionName: string): Promise<boolean> {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Are you sure you want to delete session "${sessionName}"?`,
      default: false
    }
  ]);

  return confirm;
}