import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ChatSession } from '../types';
import logger from './logger';

const SESSIONS_DIR = path.join(process.cwd(), '.claude-cli', 'sessions');

// Ensure sessions directory exists
if (!fs.existsSync(SESSIONS_DIR)) {
  fs.mkdirSync(SESSIONS_DIR, { recursive: true });
}

export function createSession(name?: string): ChatSession {
  const session: ChatSession = {
    id: uuidv4(),
    name: name || `Session ${new Date().toLocaleDateString()}`,
    messages: [],
    created: Date.now(),
    lastUpdated: Date.now()
  };

  saveSession(session);
  return session;
}

export function saveSession(session: ChatSession): void {
  try {
    const filePath = path.join(SESSIONS_DIR, `${session.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(session, null, 2));
    logger.debug(`Session saved: ${session.id}`);
  } catch (error) {
    logger.error('Error saving session:', error);
    throw new Error('Failed to save session');
  }
}

export function loadSession(sessionId: string): ChatSession {
  try {
    const filePath = path.join(SESSIONS_DIR, `${sessionId}.json`);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    logger.error(`Error loading session ${sessionId}:`, error);
    throw new Error(`Session ${sessionId} not found`);
  }
}

export function loadSessions(): ChatSession[] {
  try {
    const files = fs.readdirSync(SESSIONS_DIR);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const data = fs.readFileSync(path.join(SESSIONS_DIR, file), 'utf8');
        return JSON.parse(data);
      })
      .sort((a, b) => b.lastUpdated - a.lastUpdated);
  } catch (error) {
    logger.error('Error loading sessions:', error);
    return [];
  }
}

export function deleteSession(sessionId: string): void {
  try {
    const filePath = path.join(SESSIONS_DIR, `${sessionId}.json`);
    fs.unlinkSync(filePath);
    logger.debug(`Session deleted: ${sessionId}`);
  } catch (error) {
    logger.error(`Error deleting session ${sessionId}:`, error);
    throw new Error(`Failed to delete session ${sessionId}`);
  }
}