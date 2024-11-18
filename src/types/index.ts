import { Message } from '@anthropic-ai/sdk/resources/messages.mjs';

export interface CliConfig {
  apiKey?: string;
  model: string;
  maxTokens: number;
  temperature: number;
}

export interface ChatSession {
  id: string;
  name: string;
  messages: Message[];
  created: number;
  lastUpdated: number;
}

export * from './tools';

declare namespace NodeJS {
  interface ProcessEnv {
    ANTHROPIC_API_KEY?: string;
    NODE_ENV: 'development' | 'production' | 'test';
    LOG_LEVEL?: string;
    SESSIONS_DIR?: string;
    MAX_HISTORY?: string;
    TEMPERATURE?: string;
    MAX_TOKENS?: string;
    DEFAULT_MODEL?: string;
    STREAM_OUTPUT?: string;
  }
}