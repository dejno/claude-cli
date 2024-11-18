// src/tools/toolExecutor.ts
import { EmailSender } from './implementations/emailSender';
import { StockPriceFetcher } from './implementations/stockPrice';
import { WeatherService } from './implementations/weather';
import logger from '../utils/logger';

export class ToolExecutor {
  async executeToolCall(toolCall: any): Promise<any> {
    const { id, function: { name, arguments: args } } = toolCall;
    const parsedArgs = JSON.parse(args);

    try {
      let response;
      switch (name) {
        case 'send_email':
          response = await EmailSender.getInstance()
            .sendEmail(
              parsedArgs.to,
              parsedArgs.subject,
              parsedArgs.body,
              parsedArgs.priority
            );
          break;

        case 'get_stock_price':
          response = await StockPriceFetcher.getInstance()
            .getStockPrice(
              parsedArgs.symbol,
              parsedArgs.include_details
            );
          break;

        case 'get_weather':
          response = await WeatherService.getInstance()
            .getWeather(
              parsedArgs.location,
              parsedArgs.units
            );
          break;

        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      return {
        tool_call_id: id,
        name,
        response
      };
    } catch (error) {
      logger.error(`Tool execution error (${name}):`, error);
      throw error;
    }
  }
}