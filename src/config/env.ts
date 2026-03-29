import { cleanEnv, str, num, bool, email } from 'envalid';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const env = cleanEnv(process.env, {
  // API Configuration
  ANTHROPIC_API_KEY: str({
    desc: 'Anthropic API Key',
    example: 'sk-ant-xxxx',
    default: undefined
  }),
  
  // Application Environment
  NODE_ENV: str({
    choices: ['development', 'test', 'production'],
    default: 'development'
  }),
  
  // Logging
  LOG_LEVEL: str({
    choices: ['error', 'warn', 'info', 'debug'],
    default: 'info'
  }),
  
  // Storage
  SESSIONS_DIR: str({
    default: '.claude-cli/sessions',
    desc: 'Directory for storing chat sessions'
  }),
  
  // Model Configuration
  DEFAULT_MODEL: str({
    default: 'claude-sonnet-4-6',
    desc: 'Default Claude model to use'
  }),
  MAX_TOKENS: num({
    default: 4096,
    desc: 'Maximum tokens per response'
  }),
  TEMPERATURE: num({
    default: 0.7,
    desc: 'Model temperature (0-1)'
  }),
  
  // CLI Behavior
  MAX_HISTORY: num({
    default: 100,
    desc: 'Maximum messages to keep in history'
  }),
  STREAM_OUTPUT: bool({
    default: true,
    desc: 'Enable streaming responses'
  }),

  // GMail Config
  GMAIL_USER: email({
    desc: 'Gmail address',
    example: 'your.email@gmail.com'
  }),
  GMAIL_APP_PASSWORD: str({
    desc: 'Gmail App Password (16 characters)',
    example: 'abcd efgh ijkl mnop',
    docs: 'Generate from Google Account > Security > 2-Step Verification > App passwords'
  }),

  // Weather API Configuration
  WEATHER_API_KEY: str({
    desc: 'API key for weather service',
    default: undefined
  }),
  WEATHER_API_URL: str({
    desc: 'Weather API base URL',
    default: 'https://api.openweathermap.org/data/2.5'
  }),

  // Database Configuration  
  DB_PATH: str({
    desc: 'Path to SQLite database file',
    default: 'claude.db'
  }),

  // Stock API Configuration
  STOCK_API_KEY: str({
    desc: 'API key for stock price service', 
    default: undefined
  })
});