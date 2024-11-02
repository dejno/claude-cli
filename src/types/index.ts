export interface CliConfig {
  apiKey?: string;
  model: string;
  maxTokens: number;
  temperature: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  name: string;
  messages: ChatMessage[];
  created: number;
  lastUpdated: number;
}

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