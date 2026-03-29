// src/services/claude.ts
import Anthropic from '@anthropic-ai/sdk';
import { env } from '../config/env';
import logger from '../utils/logger';
import {
  Tool,
  ToolUseBlock,
  ToolResultBlockParam,
  MessageParam,
  Model,
  TextBlock,
  ContentBlock,
} from '@anthropic-ai/sdk/resources/messages/messages.mjs';

export interface ClaudeMessageResponse {
  id: string;
  content: ContentBlock[];
  role: string;
  model: string;
  stop_reason: string | null;
  usage: {
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
      model: env.DEFAULT_MODEL || 'claude-sonnet-4-6',
      maxTokens: env.MAX_TOKENS || 4096,
      temperature: env.TEMPERATURE || 0.7,
      stream: env.STREAM_OUTPUT || true
    };
  }

  async createMessage(
    messages: MessageParam[],
    system?: string,
    tools?: Tool[],
    options: Partial<CreateMessageOptions> = {}
  ): Promise<ClaudeMessageResponse> {
    try {
      const mergedOptions = { ...this.defaultOptions, ...options };

      logger.debug('Sending request to Claude:', {
        messages,
        system,
        tools
      });

      const response = await this.client.messages.create({
        model: mergedOptions.model,
        max_tokens: mergedOptions.maxTokens,
        temperature: mergedOptions.temperature,
        messages,
        ...(system ? { system } : {}),
        ...(tools && tools.length > 0 ? { tools } : {}),
      });

      logger.debug('Received response from Claude:', response);

      return {
        id: response.id,
        content: response.content,
        role: response.role,
        model: response.model,
        stop_reason: response.stop_reason,
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
    messages: MessageParam[],
    system?: string,
    tools?: Tool[],
    options: Partial<CreateMessageOptions> = {}
  ): AsyncGenerator<string, void, unknown> {
    try {
      const mergedOptions = { ...this.defaultOptions, ...options };

      const stream = await this.client.messages.create({
        model: mergedOptions.model,
        max_tokens: mergedOptions.maxTokens,
        temperature: mergedOptions.temperature,
        messages,
        ...(system ? { system } : {}),
        ...(tools && tools.length > 0 ? { tools } : {}),
        stream: true
      });

      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta'
        ) {
          yield chunk.delta.text;
        }
      }
    } catch (error) {
      logger.error('Error streaming message:', error);
      this.handleError(error);
    }
  }

  /**
   * Extract text content from a response's content blocks.
   */
  static getTextContent(content: ContentBlock[]): string {
    return content
      .filter((block): block is TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('');
  }

  /**
   * Extract tool use blocks from a response's content blocks.
   */
  static getToolUseBlocks(content: ContentBlock[]): ToolUseBlock[] {
    return content.filter(
      (block): block is ToolUseBlock => block.type === 'tool_use'
    );
  }

  /**
   * Build a tool result message param for sending back tool execution results.
   */
  static buildToolResultMessage(
    toolResults: Array<{ tool_use_id: string; content: string; is_error?: boolean }>
  ): MessageParam {
    return {
      role: 'user',
      content: toolResults.map(
        (result): ToolResultBlockParam => ({
          type: 'tool_result',
          tool_use_id: result.tool_use_id,
          content: result.content,
          ...(result.is_error ? { is_error: true } : {}),
        })
      ),
    };
  }

  private handleError(error: any): never {
    // Check more specific subclasses before the base APIError
    if (error instanceof Anthropic.APIConnectionError) {
      throw new Error('Failed to connect to Claude API. Please check your internet connection.');
    }

    if (error instanceof Anthropic.AuthenticationError) {
      throw new Error('Authentication failed. Please check your API key.');
    }

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

    throw error;
  }
}
