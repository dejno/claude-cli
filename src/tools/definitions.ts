// src/tools/definitions.ts
import { Tool } from '@anthropic-ai/sdk/resources/messages.mjs';

export const tools: Record<string, Tool> = {
  emailSender: {
    name: 'send_email',
    description: 'Send an email using SMTP',
    input_schema: {
      type: 'object',
      properties: {
        to: {
          type: 'string',
          description: 'Recipient email address'
        },
        subject: {
          type: 'string',
          description: 'Email subject'
        },
        body: {
          type: 'string',
          description: 'Email body content'
        },
        priority: {
          type: 'string',
          enum: ['low', 'normal', 'high'],
          description: 'Email priority level'
        }
      },
      required: ['to', 'subject', 'body']
    }
  },

  stockPrice: {
    name: 'get_stock_price',
    description: 'Get real-time stock price information',
    input_schema: {
      type: 'object',
      properties: {
        symbol: {
          type: 'string',
          description: 'Stock symbol (e.g., AAPL, MSFT)'
        },
        include_details: {
          type: 'boolean',
          description: 'Include additional market details'
        }
      },
      required: ['symbol']
    }
  },

  weatherInfo: {
    name: 'get_weather',
    description: 'Get current weather information',
    input_schema: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'City name or coordinates'
        },
        units: {
          type: 'string',
          enum: ['metric', 'imperial'],
          description: 'Temperature units'
        }
      },
      required: ['location']
    }
  }
};