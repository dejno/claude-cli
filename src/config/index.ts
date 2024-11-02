import Conf from 'conf';
import { CliConfig } from '../types';
import { env } from './env';
import logger from '../utils/logger';

const config = new Conf<CliConfig>({
  projectName: 'claude-cli',
  defaults: {
    apiKey: env.ANTHROPIC_API_KEY,
    model: env.DEFAULT_MODEL,
    maxTokens: env.MAX_TOKENS,
    temperature: env.TEMPERATURE
  },
  schema: {
    apiKey: {
      type: 'string',
      pattern: '^sk-ant-api*'
    },
    model: {
      type: 'string',
    },
    maxTokens: {
      type: 'number',
      maximum: 4096,
      minimum: 1
    },
    temperature: {
      type: 'number',
      maximum: 1,
      minimum: 0
    }
  }
});

// Load API key from environment if not set in config
if (!config.get('apiKey') && env.ANTHROPIC_API_KEY) {
  config.set('apiKey', env.ANTHROPIC_API_KEY);
  logger.debug('Loaded API key from environment');
}

export default config;