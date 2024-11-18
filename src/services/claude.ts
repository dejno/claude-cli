// src/services/claude.ts
import Anthropic from '@anthropic-ai/sdk';
import { env } from '../config/env';
import logger from '../utils/logger';
import { Tool, ToolUseBlock, Message, Model, MessageParam } from '@anthropic-ai/sdk/resources/messages.mjs';

interface ClaudeMessage {
  role: 'user' | 'assistant' | 'tool';
  content: string;
}

interface ClaudeMessageResponse {
  id: string;
  content: Array<{ type: 'text'; text: string }>;
  role: string;
  model: string;
  tool_calls?: Array<{
    id: string;
    type: 'function';
    function: {
      name: string;
      arguments: string;
    };
  }>;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}

interface CreateMessageOptions {
  model: Model;
  maxTokens: number;
  temperature: number;
  stream: boolean;
}

export class ClaudeService {
  private client: Anthropic;
  private defaultOptions: CreateMessageOptions;

  constructor(apiKey: string = env.ANTHROPIC_API_KEY!) {
    this.client = new Anthropic({
      apiKey: apiKey
    });

    this.defaultOptions = {
      model: env.DEFAULT_MODEL || 'claude-3-sonnet-20241022',
      maxTokens: env.MAX_TOKENS || 4096,
      temperature: env.TEMPERATURE || 0.7,
      stream: env.STREAM_OUTPUT || true
    };
  }

  async createMessage(
    messages: ClaudeMessage[],
    system?: string,
    tools?: Tool[],
    options: Partial<CreateMessageOptions> = {}
  ): Promise<ClaudeMessageResponse> {
    try {
      const mergedOptions = { ...this.defaultOptions, ...options };

      const formattedMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.role === 'tool' 
          ? [{ type: 'text' as const, text: msg.content }]
          : [{ type: 'text' as const, text: msg.content }]
      } as MessageParam));

      logger.debug('Sending request to Claude:', {
        messages: formattedMessages,
        system,
        tools
      });

      const response = await this.client.messages.create({
        model: mergedOptions.model,
        max_tokens: mergedOptions.maxTokens,
        temperature: mergedOptions.temperature,
        messages: formattedMessages,
        system,
        tools,
      });

      logger.debug('Received response from Claude:', response);

      return {
        id: response.id,
        content: response.content.map(block => ({
          type: 'text',
          text: block.type === 'text' ? block.text : JSON.stringify(block)
        })),
        role: response.role,
        model: response.model,
        tool_calls: response.content
          .filter((block): block is ToolUseBlock => block.type === 'tool_use')
          .map(block => ({
            id: block.id,
            type: 'function',
            function: {
              name: block.name,
              arguments: JSON.stringify(block.input)
            }
          })),
        usage: {
          input_tokens: response.usage.input_tokens,
          output_tokens: response.usage.output_tokens
        }
      };
    } catch (error) {
      logger.error('Error creating message:', error);
      this.handleError(error);
    }
  }

  async *streamMessage(
    messages: ClaudeMessage[],
    system?: string,
    tools?: Tool[],
    options: Partial<CreateMessageOptions> = {}
  ): AsyncGenerator<string, void, unknown> {
    try {
      const mergedOptions = { ...this.defaultOptions, ...options };

      const formattedMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.role === 'tool'
          ? [{ type: 'text' as const, text: msg.content }]
          : [{ type: 'text' as const, text: msg.content }]
      }));

      const stream = await this.client.messages.create({
        model: mergedOptions.model!,
        max_tokens: mergedOptions.maxTokens,
        temperature: mergedOptions.temperature,
        messages: formattedMessages as Message[],
        system,
        tools,
        stream: true
      });
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          yield chunk.delta.text;
        }
      }
    } catch (error) {
      logger.error('Error streaming message:', error);
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error instanceof Anthropic.APIError) {
      switch (error.status) {
        case 401:
          throw new Error('Invalid API key. Please check your configuration.');
        case 429:
          throw new Error('Rate limit exceeded. Please try again later.');
        case 500:
          throw new Error('Claude API service error. Please try again later.');
        default:
          throw new Error(`Claude API error: ${error.message}`);
      }
    }

    if (error instanceof Anthropic.APIConnectionError) {
      throw new Error('Failed to connect to Claude API. Please check your internet connection.');
    }

    if (error instanceof Anthropic.AuthenticationError) {
      throw new Error('Authentication failed. Please check your API key.');
    }

    throw error;
  }
}