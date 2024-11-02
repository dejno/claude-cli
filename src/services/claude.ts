import Anthropic from '@anthropic-ai/sdk';
import config from '../config';
import logger from '../utils/logger';
import { ChatMessage } from '../types';

export class ClaudeService {
  private client: Anthropic;

  constructor(apiKey?: string) {
    this.client = new Anthropic({
      apiKey: apiKey || config.get('apiKey')
    });
  }

  async sendMessage(
    message: string,
    history: ChatMessage[] = []
  ): Promise<string> {
    try {
      const messages = history.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      messages.push({ role: 'user' as const, content: message });

      const response = await this.client.messages.create({
        model: config.get('model'),
        max_tokens: config.get('maxTokens'),
        messages,
        temperature: config.get('temperature')
      });

      if (!response.content?.[0]) {
        throw new Error('No content received from Claude');
      }

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Received non-text content from Claude');
      }

      return content.text;
    } catch (error) {
      logger.error('Error sending message to Claude:', error);
      throw error;
    }
  }

  async streamMessage(
    message: string,
    history: ChatMessage[] = [],
    onChunk: (chunk: string) => void
  ): Promise<void> {
    try {
      const messages = history.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      messages.push({ role: 'user' as const, content: message });

      const stream = await this.client.messages.create({
        model: config.get('model'),
        max_tokens: config.get('maxTokens'),
        messages,
        temperature: config.get('temperature'),
        stream: true
      });

      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && 'text' in chunk.delta) {
          onChunk(chunk.delta.text);
        }
      }
    } catch (error) {
      logger.error('Error streaming message from Claude:', error);
      throw error;
    }
  }
}