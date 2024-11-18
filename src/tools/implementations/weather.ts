// src/tools/implementations/weather.ts
import axios from 'axios';
import { RateLimiter } from '../../utils/rateLimiter';
import logger from '../..//utils/logger';
import { env } from '../..//config/env';

export class WeatherService {
  private static instance: WeatherService;
  private rateLimiter: RateLimiter;

  private constructor() {
    // Rate limit: 60 requests per minute
    this.rateLimiter = new RateLimiter(60, 60000);
  }

  static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  async getWeather(location: string, units: 'metric' | 'imperial' = 'metric'): Promise<any> {
    await this.rateLimiter.acquireToken();

    try {
      const response = await axios.get(
        `${env.WEATHER_API_URL}/weather`,
        {
          params: {
            q: location,
            units,
            appid: env.WEATHER_API_KEY
          }
        }
      );

      const { main, weather, wind } = response.data;
      
      return {
        temperature: main.temp,
        feels_like: main.feels_like,
        humidity: main.humidity,
        description: weather[0].description,
        wind_speed: wind.speed
      };
    } catch (error: unknown) {
      logger.error(`Weather fetch failed for ${location}:`, error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch weather: ${error.message}`);
      }
      throw new Error('Failed to fetch weather: Unknown error');
    }
  }
}
