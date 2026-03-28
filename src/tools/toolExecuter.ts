// src/tools/toolExecutor.ts
import { ToolUseBlock } from '@anthropic-ai/sdk/resources/messages/messages.mjs';
import { EmailSender } from './implementations/emailSender';
import { StockPriceFetcher } from './implementations/stockPrice';
import { WeatherService } from './implementations/weather';
import logger from '../utils/logger';

export interface ToolExecutionResult {
  tool_use_id: string;
  name: string;
  content: string;
  is_error: boolean;
}

export class ToolExecutor {
  async executeToolCall(toolUseBlock: ToolUseBlock): Promise<ToolExecutionResult> {
    const { id, name, input } = toolUseBlock;
    const args = input as Record<string, unknown>;

    try {
      let response;
      switch (name) {
        case 'send_email':
          response = await EmailSender.getInstance()
            .sendEmail(
              args.to as string,
              args.subject as string,
              args.body as string,
              args.priority as 'low' | 'normal' | 'high' | undefined
            );
          break;

        case 'get_stock_price':
          response = await StockPriceFetcher.getInstance()
            .getStockPrice(
              args.symbol as string,
              args.include_details as boolean | undefined
            );
          break;

        case 'get_weather':
          response = await WeatherService.getInstance()
            .getWeather(
              args.location as string,
              args.units as 'metric' | 'imperial' | undefined
            );
          break;

        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      return {
        tool_use_id: id,
        name,
        content: JSON.stringify(response),
        is_error: false
      };
    } catch (error) {
      logger.error(`Tool execution error (${name}):`, error);
      return {
        tool_use_id: id,
        name,
        content: JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
        is_error: true
      };
    }
  }
}
