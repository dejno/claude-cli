// Mock env BEFORE any imports that might trigger it
jest.mock('../../config/env', () => ({
  env: {
    ANTHROPIC_API_KEY: 'test-key',
    NODE_ENV: 'test',
    LOG_LEVEL: 'error',
    SESSIONS_DIR: '.test-sessions',
    DEFAULT_MODEL: 'claude-sonnet-4-5-20250929',
    MAX_TOKENS: 4096,
    TEMPERATURE: 0.7,
    STREAM_OUTPUT: true,
    GMAIL_USER: 'test@gmail.com',
    GMAIL_APP_PASSWORD: 'testpassword12345',
    WEATHER_API_KEY: 'test-weather-key',
    WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5',
    DB_PATH: 'test.db',
    STOCK_API_KEY: 'test-stock-key',
  }
}));

// Mock logger (it imports env)
jest.mock('../../utils/logger', () => ({
  __esModule: true,
  default: {
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  }
}));

// Mock tool implementations
jest.mock('../implementations/emailSender');
jest.mock('../implementations/stockPrice');
jest.mock('../implementations/weather');

import { ToolExecutor, ToolExecutionResult } from '../toolExecuter';
import { ToolUseBlock } from '@anthropic-ai/sdk/resources/messages/messages.mjs';
import { EmailSender } from '../implementations/emailSender';
import { StockPriceFetcher } from '../implementations/stockPrice';
import { WeatherService } from '../implementations/weather';

describe('ToolExecutor', () => {
  let executor: ToolExecutor;
  let mockEmailSender: jest.Mocked<EmailSender>;
  let mockStockFetcher: jest.Mocked<StockPriceFetcher>;
  let mockWeatherService: jest.Mocked<WeatherService>;

  beforeEach(() => {
    executor = new ToolExecutor();

    mockEmailSender = {
      sendEmail: jest.fn(),
    } as any;

    mockStockFetcher = {
      getStockPrice: jest.fn(),
    } as any;

    mockWeatherService = {
      getWeather: jest.fn(),
    } as any;

    (EmailSender.getInstance as jest.Mock).mockReturnValue(mockEmailSender);
    (StockPriceFetcher.getInstance as jest.Mock).mockReturnValue(mockStockFetcher);
    (WeatherService.getInstance as jest.Mock).mockReturnValue(mockWeatherService);
  });

  function makeToolUseBlock(name: string, input: Record<string, unknown>): ToolUseBlock {
    return {
      type: 'tool_use',
      id: `toolu_${Math.random().toString(36).slice(2)}`,
      name,
      input,
      caller: { type: 'direct' },
    } as ToolUseBlock;
  }

  describe('send_email', () => {
    it('should execute email tool and return success result', async () => {
      mockEmailSender.sendEmail.mockResolvedValue({ messageId: 'abc123', success: true });

      const toolBlock = makeToolUseBlock('send_email', {
        to: 'test@example.com',
        subject: 'Test',
        body: 'Hello',
        priority: 'high'
      });

      const result = await executor.executeToolCall(toolBlock);

      expect(mockEmailSender.sendEmail).toHaveBeenCalledWith(
        'test@example.com', 'Test', 'Hello', 'high'
      );
      expect(result.tool_use_id).toBe(toolBlock.id);
      expect(result.name).toBe('send_email');
      expect(result.is_error).toBe(false);
      expect(JSON.parse(result.content)).toEqual({ messageId: 'abc123', success: true });
    });
  });

  describe('get_stock_price', () => {
    it('should execute stock price tool and return result', async () => {
      const stockData = { price: 150.25, change: 2.5, changePercent: '1.7%' };
      mockStockFetcher.getStockPrice.mockResolvedValue(stockData);

      const toolBlock = makeToolUseBlock('get_stock_price', {
        symbol: 'AAPL',
        include_details: true
      });

      const result = await executor.executeToolCall(toolBlock);

      expect(mockStockFetcher.getStockPrice).toHaveBeenCalledWith('AAPL', true);
      expect(result.is_error).toBe(false);
      expect(JSON.parse(result.content)).toEqual(stockData);
    });
  });

  describe('get_weather', () => {
    it('should execute weather tool and return result', async () => {
      const weatherData = { temperature: 72, description: 'Sunny', humidity: 45 };
      mockWeatherService.getWeather.mockResolvedValue(weatherData);

      const toolBlock = makeToolUseBlock('get_weather', {
        location: 'New York',
        units: 'imperial'
      });

      const result = await executor.executeToolCall(toolBlock);

      expect(mockWeatherService.getWeather).toHaveBeenCalledWith('New York', 'imperial');
      expect(result.is_error).toBe(false);
      expect(JSON.parse(result.content)).toEqual(weatherData);
    });
  });

  describe('error handling', () => {
    it('should return error result for failed tool execution', async () => {
      mockEmailSender.sendEmail.mockRejectedValue(new Error('SMTP connection failed'));

      const toolBlock = makeToolUseBlock('send_email', {
        to: 'test@example.com',
        subject: 'Test',
        body: 'Hello'
      });

      const result = await executor.executeToolCall(toolBlock);

      expect(result.is_error).toBe(true);
      expect(JSON.parse(result.content)).toEqual({ error: 'SMTP connection failed' });
    });

    it('should return error result for unknown tool', async () => {
      const toolBlock = makeToolUseBlock('unknown_tool', { arg: 'value' });

      const result = await executor.executeToolCall(toolBlock);

      expect(result.is_error).toBe(true);
      expect(JSON.parse(result.content)).toEqual({ error: 'Unknown tool: unknown_tool' });
    });

    it('should handle non-Error thrown values', async () => {
      mockStockFetcher.getStockPrice.mockRejectedValue('string error');

      const toolBlock = makeToolUseBlock('get_stock_price', { symbol: 'AAPL' });

      const result = await executor.executeToolCall(toolBlock);

      expect(result.is_error).toBe(true);
      expect(JSON.parse(result.content)).toEqual({ error: 'string error' });
    });
  });
});
