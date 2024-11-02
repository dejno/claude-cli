import winston from 'winston';
import { env } from '../config/env';
import { LOGS_PATH } from './paths';
import path from 'path';

const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(LOGS_PATH, 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(LOGS_PATH, 'combined.log')
    })
  ]
});

if (env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export default logger;