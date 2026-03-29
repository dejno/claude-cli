// Test that configure command offers the latest models
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

jest.mock('../../config', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn(),
  }
}));

import fs from 'fs';
import path from 'path';

describe('Configure command model choices', () => {
  it('should offer claude-sonnet-4-6 as a model choice', () => {
    const configSource = fs.readFileSync(
      path.join(__dirname, '..', 'configure.ts'),
      'utf8'
    );
    expect(configSource).toContain('claude-sonnet-4-6');
  });

  it('should offer claude-opus-4-6 as a model choice', () => {
    const configSource = fs.readFileSync(
      path.join(__dirname, '..', 'configure.ts'),
      'utf8'
    );
    expect(configSource).toContain('claude-opus-4-6');
  });

  it('should offer claude-haiku-4-5 as a model choice', () => {
    const configSource = fs.readFileSync(
      path.join(__dirname, '..', 'configure.ts'),
      'utf8'
    );
    expect(configSource).toContain('claude-haiku-4-5');
  });

  it('should NOT reference deprecated claude-3 models', () => {
    const configSource = fs.readFileSync(
      path.join(__dirname, '..', 'configure.ts'),
      'utf8'
    );
    expect(configSource).not.toContain('claude-3-5-sonnet');
    expect(configSource).not.toContain('claude-3-5-opus');
  });
});
