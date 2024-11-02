import { cleanEnv, str, num, bool } from 'envalid';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('Loading configuration...', process.env.DEFAULT_MODEL);


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
    default: 'claude-3-5-sonnet-20241022',
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
  })
});