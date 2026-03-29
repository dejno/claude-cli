// Integration tests for CLI program setup and command routing
jest.mock('../../config/env', () => ({
  env: {
    ANTHROPIC_API_KEY: 'sk-ant-api-test-key-123',
    NODE_ENV: 'test',
    LOG_LEVEL: 'error',
    SESSIONS_DIR: '.test-sessions',
    DEFAULT_MODEL: 'claude-sonnet-4-6',
    MAX_TOKENS: 4096,
    TEMPERATURE: 0.7,
    STREAM_OUTPUT: true,
    GMAIL_USER: 'test@gmail.com',
    GMAIL_APP_PASSWORD: 'testpassword12345',
    WEATHER_API_KEY: 'test-key',
    WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5',
    DB_PATH: 'test.db',
    STOCK_API_KEY: 'test-key',
  }
}));

jest.mock('../../utils/logger', () => ({
  __esModule: true,
  default: {
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    level: 'error',
    silent: false,
  }
}));

import { Command } from 'commander';
import { chat } from '../chat';
import { configure } from '../configure';
import { sessions } from '../sessions';

describe('CLI Integration', () => {
  describe('Command registration', () => {
    let program: Command;

    beforeEach(() => {
      program = new Command();
      program
        .name('claude')
        .description('Anthropic Claude API CLI Tool')
        .version('1.0.0', '-v, --version')
        .addCommand(chat)
        .addCommand(configure)
        .addCommand(sessions);

      program
        .option('-d, --debug', 'Enable debug mode')
        .option('-q, --quiet', 'Suppress output');
    });

    it('should register the chat command', () => {
      const chatCmd = program.commands.find(c => c.name() === 'chat');
      expect(chatCmd).toBeDefined();
      expect(chatCmd!.description()).toBe('Start a chat session with Claude');
    });

    it('should register the configure command', () => {
      const configCmd = program.commands.find(c => c.name() === 'configure');
      expect(configCmd).toBeDefined();
      expect(configCmd!.description()).toBe('Configure CLI settings');
    });

    it('should register the sessions command', () => {
      const sessionsCmd = program.commands.find(c => c.name() === 'sessions');
      expect(sessionsCmd).toBeDefined();
      expect(sessionsCmd!.description()).toBe('Manage chat sessions');
    });

    it('should have global --debug option', () => {
      const debugOpt = program.options.find(o => o.long === '--debug');
      expect(debugOpt).toBeDefined();
    });

    it('should have global --quiet option', () => {
      const quietOpt = program.options.find(o => o.long === '--quiet');
      expect(quietOpt).toBeDefined();
    });

    it('should have version flag', () => {
      const versionOpt = program.options.find(o => o.long === '--version');
      expect(versionOpt).toBeDefined();
    });
  });

  describe('chat command options', () => {
    it('should have --session option', () => {
      const opt = chat.options.find(o => o.long === '--session');
      expect(opt).toBeDefined();
    });

    it('should have --no-tools option', () => {
      const opt = chat.options.find(o => o.long === '--no-tools');
      expect(opt).toBeDefined();
    });

    it('should have --list-tools option', () => {
      const opt = chat.options.find(o => o.long === '--list-tools');
      expect(opt).toBeDefined();
    });
  });

  describe('sessions command options', () => {
    it('should have --list option', () => {
      const opt = sessions.options.find(o => o.long === '--list');
      expect(opt).toBeDefined();
    });

    it('should have --delete option', () => {
      const opt = sessions.options.find(o => o.long === '--delete');
      expect(opt).toBeDefined();
    });
  });
});
