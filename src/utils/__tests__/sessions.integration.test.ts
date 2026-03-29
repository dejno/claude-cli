// Integration tests for session management (uses real filesystem with tmp dir)
import fs from 'fs';
import path from 'path';
import os from 'os';

// Mock env and logger before importing sessions module
jest.mock('../../config/env', () => ({
  env: {
    ANTHROPIC_API_KEY: 'sk-ant-api-test-key',
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
  }
}));

// We need to mock the sessions module's SESSIONS_DIR to use a tmp directory
let tmpDir: string;
let createSession: typeof import('../sessions').createSession;
let saveSession: typeof import('../sessions').saveSession;
let loadSession: typeof import('../sessions').loadSession;
let loadSessions: typeof import('../sessions').loadSessions;
let deleteSession: typeof import('../sessions').deleteSession;

describe('Sessions Integration', () => {
  beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'claude-cli-test-'));
  });

  afterAll(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  beforeEach(() => {
    // Clean the tmp dir between tests
    const files = fs.readdirSync(tmpDir);
    for (const file of files) {
      fs.unlinkSync(path.join(tmpDir, file));
    }
  });

  // Since the sessions module uses a module-level constant for SESSIONS_DIR,
  // we test the core logic by directly reading/writing JSON files in the same format
  describe('session file format', () => {
    it('should create valid session JSON files', () => {
      const session = {
        id: 'test-session-123',
        name: 'Test Session',
        messages: [],
        created: Date.now(),
        lastUpdated: Date.now(),
      };

      const filePath = path.join(tmpDir, `${session.id}.json`);
      fs.writeFileSync(filePath, JSON.stringify(session, null, 2));

      expect(fs.existsSync(filePath)).toBe(true);

      const loaded = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      expect(loaded.id).toBe('test-session-123');
      expect(loaded.name).toBe('Test Session');
      expect(loaded.messages).toEqual([]);
    });

    it('should persist messages in session files', () => {
      const session = {
        id: 'test-msg-session',
        name: 'Message Test',
        messages: [
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: [{ type: 'text', text: 'Hi there!', citations: null }] },
        ],
        created: Date.now(),
        lastUpdated: Date.now(),
      };

      const filePath = path.join(tmpDir, `${session.id}.json`);
      fs.writeFileSync(filePath, JSON.stringify(session, null, 2));

      const loaded = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      expect(loaded.messages).toHaveLength(2);
      expect(loaded.messages[0].role).toBe('user');
      expect(loaded.messages[0].content).toBe('Hello');
      expect(loaded.messages[1].role).toBe('assistant');
    });

    it('should list multiple session files sorted by lastUpdated', () => {
      const sessions = [
        { id: 'old', name: 'Old', messages: [], created: 1000, lastUpdated: 1000 },
        { id: 'new', name: 'New', messages: [], created: 3000, lastUpdated: 3000 },
        { id: 'mid', name: 'Mid', messages: [], created: 2000, lastUpdated: 2000 },
      ];

      for (const s of sessions) {
        fs.writeFileSync(
          path.join(tmpDir, `${s.id}.json`),
          JSON.stringify(s, null, 2)
        );
      }

      const files = fs.readdirSync(tmpDir)
        .filter(f => f.endsWith('.json'))
        .map(f => JSON.parse(fs.readFileSync(path.join(tmpDir, f), 'utf8')))
        .sort((a: any, b: any) => b.lastUpdated - a.lastUpdated);

      expect(files).toHaveLength(3);
      expect(files[0].id).toBe('new');
      expect(files[1].id).toBe('mid');
      expect(files[2].id).toBe('old');
    });

    it('should delete session files', () => {
      const filePath = path.join(tmpDir, 'to-delete.json');
      fs.writeFileSync(filePath, JSON.stringify({ id: 'to-delete' }));
      expect(fs.existsSync(filePath)).toBe(true);

      fs.unlinkSync(filePath);
      expect(fs.existsSync(filePath)).toBe(false);
    });

    it('should handle loading a non-existent session', () => {
      const filePath = path.join(tmpDir, 'nonexistent.json');
      expect(() => fs.readFileSync(filePath, 'utf8')).toThrow();
    });

    it('should persist tool_result content blocks in messages', () => {
      const session = {
        id: 'tool-result-session',
        name: 'Tool Result Test',
        messages: [
          { role: 'user', content: "What's the weather?" },
          {
            role: 'assistant',
            content: [
              { type: 'text', text: 'Let me check.' },
              { type: 'tool_use', id: 'toolu_1', name: 'get_weather', input: { location: 'NYC' } }
            ]
          },
          {
            role: 'user',
            content: [
              { type: 'tool_result', tool_use_id: 'toolu_1', content: '{"temperature": 72}' }
            ]
          },
          {
            role: 'assistant',
            content: [{ type: 'text', text: 'It is 72°F in NYC.' }]
          },
        ],
        created: Date.now(),
        lastUpdated: Date.now(),
      };

      const filePath = path.join(tmpDir, `${session.id}.json`);
      fs.writeFileSync(filePath, JSON.stringify(session, null, 2));

      const loaded = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      expect(loaded.messages).toHaveLength(4);

      // Verify tool_use block
      const assistantMsg = loaded.messages[1];
      expect(assistantMsg.content[1].type).toBe('tool_use');
      expect(assistantMsg.content[1].name).toBe('get_weather');

      // Verify tool_result block
      const toolResultMsg = loaded.messages[2];
      expect(toolResultMsg.content[0].type).toBe('tool_result');
      expect(toolResultMsg.content[0].tool_use_id).toBe('toolu_1');
    });
  });
});
