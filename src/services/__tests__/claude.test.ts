// Mock the env module
jest.mock('../../config/env', () => ({
  env: {
    ANTHROPIC_API_KEY: 'test-api-key',
    DEFAULT_MODEL: 'claude-sonnet-4-5-20250929',
    MAX_TOKENS: 4096,
    TEMPERATURE: 0.7,
    STREAM_OUTPUT: true,
  }
}));

// Mock the logger
jest.mock('../../utils/logger', () => ({
  __esModule: true,
  default: {
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  }
}));

import Anthropic from '@anthropic-ai/sdk';
import { ClaudeService } from '../claude';
import { ContentBlock, TextBlock, ToolUseBlock, MessageParam } from '@anthropic-ai/sdk/resources/messages/messages.mjs';

// Manually mock the Anthropic constructor while keeping error classes real
const mockCreate = jest.fn();
jest.mock('@anthropic-ai/sdk', () => {
  const actual = jest.requireActual('@anthropic-ai/sdk');
  return {
    __esModule: true,
    default: Object.assign(
      jest.fn(() => ({
        messages: { create: mockCreate }
      })),
      {
        APIError: actual.default.APIError ?? actual.APIError,
        APIConnectionError: actual.default.APIConnectionError ?? actual.APIConnectionError,
        AuthenticationError: actual.default.AuthenticationError ?? actual.AuthenticationError,
      }
    ),
  };
});

describe('ClaudeService', () => {
  let service: ClaudeService;

  beforeEach(() => {
    mockCreate.mockReset();
    service = new ClaudeService('test-api-key');
  });

  describe('constructor', () => {
    it('should initialize with provided API key', () => {
      const AnthropicMock = jest.requireMock('@anthropic-ai/sdk').default;
      expect(AnthropicMock).toHaveBeenCalledWith({ apiKey: 'test-api-key' });
    });
  });

  describe('createMessage', () => {
    const mockResponse = {
      id: 'msg_123',
      content: [
        { type: 'text' as const, text: 'Hello! How can I help you?', citations: null }
      ],
      role: 'assistant' as const,
      model: 'claude-sonnet-4-5-20250929',
      stop_reason: 'end_turn' as const,
      usage: {
        input_tokens: 10,
        output_tokens: 20
      }
    };

    it('should send a message and return a properly formatted response', async () => {
      mockCreate.mockResolvedValue(mockResponse);

      const messages: MessageParam[] = [
        { role: 'user', content: 'Hello' }
      ];

      const result = await service.createMessage(messages);

      expect(mockCreate).toHaveBeenCalledWith({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 4096,
        temperature: 0.7,
        messages,
      });

      expect(result).toEqual({
        id: 'msg_123',
        content: mockResponse.content,
        role: 'assistant',
        model: 'claude-sonnet-4-5-20250929',
        stop_reason: 'end_turn',
        usage: { input_tokens: 10, output_tokens: 20 }
      });
    });

    it('should pass system prompt when provided', async () => {
      mockCreate.mockResolvedValue(mockResponse);

      const messages: MessageParam[] = [
        { role: 'user', content: 'Hello' }
      ];

      await service.createMessage(messages, 'You are a helpful assistant.');

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          system: 'You are a helpful assistant.',
        })
      );
    });

    it('should pass tools when provided', async () => {
      mockCreate.mockResolvedValue(mockResponse);

      const testTools = [{
        name: 'test_tool',
        description: 'A test tool',
        input_schema: {
          type: 'object' as const,
          properties: { arg: { type: 'string' } },
          required: ['arg']
        }
      }];

      const messages: MessageParam[] = [
        { role: 'user', content: 'Use the tool' }
      ];

      await service.createMessage(messages, undefined, testTools);

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          tools: testTools,
        })
      );
    });

    it('should not include system or tools when not provided', async () => {
      mockCreate.mockResolvedValue(mockResponse);

      const messages: MessageParam[] = [
        { role: 'user', content: 'Hello' }
      ];

      await service.createMessage(messages);

      const callArgs = mockCreate.mock.calls[0][0];
      expect(callArgs).not.toHaveProperty('system');
      expect(callArgs).not.toHaveProperty('tools');
    });

    it('should allow overriding default options', async () => {
      mockCreate.mockResolvedValue(mockResponse);

      const messages: MessageParam[] = [
        { role: 'user', content: 'Hello' }
      ];

      await service.createMessage(messages, undefined, undefined, {
        maxTokens: 1024,
        temperature: 0.5
      });

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          max_tokens: 1024,
          temperature: 0.5,
        })
      );
    });

    it('should handle response with tool_use content blocks', async () => {
      const toolUseResponse = {
        ...mockResponse,
        content: [
          { type: 'text' as const, text: 'Let me check that for you.', citations: null },
          {
            type: 'tool_use' as const,
            id: 'toolu_123',
            name: 'get_weather',
            input: { location: 'London' },
            caller: { type: 'direct' as const }
          }
        ],
        stop_reason: 'tool_use' as const,
      };

      mockCreate.mockResolvedValue(toolUseResponse);

      const messages: MessageParam[] = [
        { role: 'user', content: "What's the weather in London?" }
      ];

      const result = await service.createMessage(messages);

      expect(result.content).toHaveLength(2);
      expect(result.content[0]).toMatchObject({ type: 'text', text: 'Let me check that for you.' });
      expect(result.content[1]).toMatchObject({
        type: 'tool_use',
        id: 'toolu_123',
        name: 'get_weather',
        input: { location: 'London' }
      });
      expect(result.stop_reason).toBe('tool_use');
    });

    it('should throw on invalid API key (401)', async () => {
      const RealAnthropic = jest.requireActual('@anthropic-ai/sdk');
      const AnthropicClass = RealAnthropic.default ?? RealAnthropic;
      const apiError = new AnthropicClass.APIError(401, { type: 'error', error: { type: 'authentication_error', message: 'Invalid API key' } }, 'Invalid API key', undefined);
      mockCreate.mockRejectedValue(apiError);

      const messages: MessageParam[] = [{ role: 'user', content: 'Hello' }];

      await expect(service.createMessage(messages)).rejects.toThrow(
        'Invalid API key. Please check your configuration.'
      );
    });

    it('should throw on rate limit (429)', async () => {
      const RealAnthropic = jest.requireActual('@anthropic-ai/sdk');
      const AnthropicClass = RealAnthropic.default ?? RealAnthropic;
      const apiError = new AnthropicClass.APIError(429, { type: 'error', error: { type: 'rate_limit_error', message: 'Rate limited' } }, 'Rate limited', undefined);
      mockCreate.mockRejectedValue(apiError);

      const messages: MessageParam[] = [{ role: 'user', content: 'Hello' }];

      await expect(service.createMessage(messages)).rejects.toThrow(
        'Rate limit exceeded. Please try again later.'
      );
    });

    it('should throw on server error (500)', async () => {
      const RealAnthropic = jest.requireActual('@anthropic-ai/sdk');
      const AnthropicClass = RealAnthropic.default ?? RealAnthropic;
      const apiError = new AnthropicClass.APIError(500, { type: 'error', error: { type: 'api_error', message: 'Server error' } }, 'Server error', undefined);
      mockCreate.mockRejectedValue(apiError);

      const messages: MessageParam[] = [{ role: 'user', content: 'Hello' }];

      await expect(service.createMessage(messages)).rejects.toThrow(
        'Claude API service error. Please try again later.'
      );
    });

    it('should throw on connection error', async () => {
      const RealAnthropic = jest.requireActual('@anthropic-ai/sdk');
      const AnthropicClass = RealAnthropic.default ?? RealAnthropic;
      const connError = new AnthropicClass.APIConnectionError({ message: 'Connection failed' });
      mockCreate.mockRejectedValue(connError);

      const messages: MessageParam[] = [{ role: 'user', content: 'Hello' }];

      await expect(service.createMessage(messages)).rejects.toThrow(
        'Failed to connect to Claude API. Please check your internet connection.'
      );
    });

    it('should re-throw unknown errors', async () => {
      const unknownError = new Error('Something unexpected');
      mockCreate.mockRejectedValue(unknownError);

      const messages: MessageParam[] = [{ role: 'user', content: 'Hello' }];

      await expect(service.createMessage(messages)).rejects.toThrow('Something unexpected');
    });
  });

  describe('streamMessage', () => {
    it('should yield text deltas from stream', async () => {
      const mockStream = (async function* () {
        yield { type: 'message_start', message: { id: 'msg_1' } };
        yield { type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } };
        yield { type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text: 'Hello' } };
        yield { type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text: ' world' } };
        yield { type: 'content_block_stop', index: 0 };
        yield { type: 'message_stop' };
      })();

      mockCreate.mockResolvedValue(mockStream);

      const messages: MessageParam[] = [{ role: 'user', content: 'Hello' }];
      const chunks: string[] = [];

      for await (const chunk of service.streamMessage(messages)) {
        chunks.push(chunk);
      }

      expect(chunks).toEqual(['Hello', ' world']);
    });

    it('should skip non-text-delta events', async () => {
      const mockStream = (async function* () {
        yield { type: 'content_block_delta', index: 0, delta: { type: 'input_json_delta', partial_json: '{"lo' } };
        yield { type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text: 'Only this' } };
      })();

      mockCreate.mockResolvedValue(mockStream);

      const messages: MessageParam[] = [{ role: 'user', content: 'Hello' }];
      const chunks: string[] = [];

      for await (const chunk of service.streamMessage(messages)) {
        chunks.push(chunk);
      }

      expect(chunks).toEqual(['Only this']);
    });

    it('should handle stream errors', async () => {
      const RealAnthropic = jest.requireActual('@anthropic-ai/sdk');
      const AnthropicClass = RealAnthropic.default ?? RealAnthropic;
      const connError = new AnthropicClass.APIConnectionError({ message: 'Stream failed' });
      mockCreate.mockRejectedValue(connError);

      const messages: MessageParam[] = [{ role: 'user', content: 'Hello' }];

      await expect(async () => {
        for await (const _chunk of service.streamMessage(messages)) {
          // consume
        }
      }).rejects.toThrow('Failed to connect to Claude API');
    });
  });

  describe('static helpers', () => {
    describe('getTextContent', () => {
      it('should extract text from content blocks', () => {
        const content: ContentBlock[] = [
          { type: 'text', text: 'Hello ', citations: null } as TextBlock,
          { type: 'text', text: 'world', citations: null } as TextBlock,
        ];

        expect(ClaudeService.getTextContent(content)).toBe('Hello world');
      });

      it('should ignore non-text blocks', () => {
        const content: ContentBlock[] = [
          { type: 'text', text: 'Before tool.', citations: null } as TextBlock,
          {
            type: 'tool_use',
            id: 'toolu_1',
            name: 'test',
            input: {},
            caller: { type: 'direct' }
          } as ToolUseBlock,
        ];

        expect(ClaudeService.getTextContent(content)).toBe('Before tool.');
      });

      it('should return empty string for no text blocks', () => {
        const content: ContentBlock[] = [
          {
            type: 'tool_use',
            id: 'toolu_1',
            name: 'test',
            input: {},
            caller: { type: 'direct' }
          } as ToolUseBlock,
        ];

        expect(ClaudeService.getTextContent(content)).toBe('');
      });
    });

    describe('getToolUseBlocks', () => {
      it('should extract tool_use blocks', () => {
        const toolBlock = {
          type: 'tool_use' as const,
          id: 'toolu_1',
          name: 'get_weather',
          input: { location: 'NYC' },
          caller: { type: 'direct' as const }
        };

        const content: ContentBlock[] = [
          { type: 'text', text: 'Let me check.', citations: null } as TextBlock,
          toolBlock as ToolUseBlock,
        ];

        const result = ClaudeService.getToolUseBlocks(content);
        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
          type: 'tool_use',
          id: 'toolu_1',
          name: 'get_weather',
        });
      });

      it('should return empty array when no tool_use blocks', () => {
        const content: ContentBlock[] = [
          { type: 'text', text: 'No tools used.', citations: null } as TextBlock,
        ];

        expect(ClaudeService.getToolUseBlocks(content)).toEqual([]);
      });
    });

    describe('buildToolResultMessage', () => {
      it('should build a proper tool_result message', () => {
        const result = ClaudeService.buildToolResultMessage([
          { tool_use_id: 'toolu_1', content: '{"temp": 72}' },
        ]);

        expect(result).toEqual({
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: 'toolu_1',
              content: '{"temp": 72}',
            }
          ]
        });
      });

      it('should include is_error flag when true', () => {
        const result = ClaudeService.buildToolResultMessage([
          { tool_use_id: 'toolu_1', content: '{"error": "not found"}', is_error: true },
        ]);

        expect(result).toEqual({
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: 'toolu_1',
              content: '{"error": "not found"}',
              is_error: true,
            }
          ]
        });
      });

      it('should handle multiple tool results', () => {
        const result = ClaudeService.buildToolResultMessage([
          { tool_use_id: 'toolu_1', content: '{"a": 1}' },
          { tool_use_id: 'toolu_2', content: '{"b": 2}', is_error: false },
        ]);

        expect(result.role).toBe('user');
        expect(result.content).toHaveLength(2);
      });
    });
  });
});
