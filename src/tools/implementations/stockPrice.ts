// src/tools/implementations/stockPrice.ts
import axios from 'axios';
import { RateLimiter } from '../../utils/rateLimiter';
import { env } from '../../config/env';
import logger from '../../utils/logger';

interface AlphaVantageQuote {
  'Global Quote': {
    '01. symbol': string;
    '02. open': string;
    '03. high': string;
    '04. low': string;
    '05. price': string;
    '06. volume': string;
    '07. latest trading day': string;
    '08. previous close': string;
    '09. change': string;
    '10. change percent': string;
  };
}

interface StockResponse {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  lastTradingDay: string;
}

export class StockPriceFetcher {
  private static instance: StockPriceFetcher;
  private rateLimiter: RateLimiter;
  private cache: Map<string, { data: StockResponse; timestamp: number }>;
  private readonly CACHE_DURATION = 60000; // 1 minute cache
  private readonly API_URL = 'https://www.alphavantage.co/query';

  private constructor() {
    // Alpha Vantage free tier: 25 requests per day
    // Using a conservative limit of 24 requests per day to be safe
    const DAILY_LIMIT = 24;
    const DAY_IN_MS = 24 * 60 * 60 * 1000;
    this.rateLimiter = new RateLimiter(DAILY_LIMIT, DAY_IN_MS);
    this.cache = new Map();
  }

  static getInstance(): StockPriceFetcher {
    if (!StockPriceFetcher.instance) {
      StockPriceFetcher.instance = new StockPriceFetcher();
    }
    return StockPriceFetcher.instance;
  }

  private getCacheKey(symbol: string): string {
    return symbol.toUpperCase();
  }

  private isCacheValid(cacheEntry: { timestamp: number }): boolean {
    return Date.now() - cacheEntry.timestamp < this.CACHE_DURATION;
  }

  private formatResponse(data: AlphaVantageQuote): StockResponse {
    const quote = data['Global Quote'];
    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: quote['10. change percent'],
      volume: parseInt(quote['06. volume']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      open: parseFloat(quote['02. open']),
      previousClose: parseFloat(quote['08. previous close']),
      lastTradingDay: quote['07. latest trading day']
    };
  }

  private validateApiKey(): void {
    if (!env.STOCK_API_KEY) {
      throw new Error('Alpha Vantage API key is not configured');
    }
  }

  private handleApiError(error: any, symbol: string): never {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid Alpha Vantage API key');
      }
      if (error.response?.status === 429) {
        throw new Error('Alpha Vantage API rate limit exceeded');
      }
      if (error.response?.status === 404) {
        throw new Error(`Stock symbol not found: ${symbol}`);
      }
    }
    throw new Error(`Failed to fetch stock data: ${error.message}`);
  }

  async getStockPrice(symbol: string, includeDetails: boolean = false): Promise<Partial<StockResponse>> {
    this.validateApiKey();
    const cacheKey = this.getCacheKey(symbol);
    
    // Check cache first
    const cachedData = this.cache.get(cacheKey);
    if (cachedData && this.isCacheValid(cachedData)) {
      logger.debug(`Returning cached data for ${symbol}`);
      return includeDetails ? cachedData.data : {
        symbol: cachedData.data.symbol,
        price: cachedData.data.price,
        change: cachedData.data.change,
        changePercent: cachedData.data.changePercent
      };
    }

    try {
      // Acquire rate limiting token
      await this.rateLimiter.acquireToken();

      logger.debug(`Fetching stock data for ${symbol}`);
      const response = await axios.get<AlphaVantageQuote>(this.API_URL, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
          apikey: env.STOCK_API_KEY
        }
      });

      // Check for API error responses
      if ('Note' in response.data) {
        throw new Error('Alpha Vantage API rate limit exceeded');
      }

      if (!response.data['Global Quote'] || Object.keys(response.data['Global Quote']).length === 0) {
        throw new Error(`No data found for symbol: ${symbol}`);
      }

      const formattedResponse = this.formatResponse(response.data);

      // Update cache
      this.cache.set(cacheKey, {
        data: formattedResponse,
        timestamp: Date.now()
      });

      // Return full or partial response based on includeDetails
      return includeDetails ? formattedResponse : {
        symbol: formattedResponse.symbol,
        price: formattedResponse.price,
        change: formattedResponse.change,
        changePercent: formattedResponse.changePercent
      };

    } catch (error) {
      this.handleApiError(error, symbol);
    }
  }

  // Method to get remaining API calls for the day
  async getRemainingCalls(): Promise<number> {
    return this.rateLimiter.getAvailableTokens();
  }

  // Method to clear cache
  clearCache(): void {
    this.cache.clear();
    logger.debug('Stock price cache cleared');
  }
}