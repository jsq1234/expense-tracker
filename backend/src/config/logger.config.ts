import pino from 'pino';
import { LoggerOptions } from 'pino';
import { config } from "dotenv";
config();

const loggerOptions: LoggerOptions = 
    process.env.NODE_ENV === 'production' ? 
    {
        level: 'info',
        formatters: {
            level: (label)  => {
                return { level: label.toUpperCase() };
            }
        },
        timestamp: pino.stdTimeFunctions.isoTime,
        redact: {
            paths: [
                'password', 
                'credentials', 
                'req.headers.authorization',
                'body.password',
            ]
        }
    } :
    {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname'
          }
        }
    };
  
export const logger = pino(loggerOptions);