import pino, { P } from 'pino';
import { LoggerOptions } from 'pino';
import { pinoHttp } from 'pino-http';
import { config } from "dotenv";
import { ZodError } from 'zod';
config();

const loggerOptions: LoggerOptions = 
    process.env.NODE_ENV === 'PRODUCTION' ? 
    {
        level: 'info',
        base: null,
        timestamp: pino.stdTimeFunctions.isoTime,
        redact: {
            paths: [
                'password', 
                'credentials', 
                'req.headers.authorization',
                'body.password',
                'user.password'
            ]
        },
        transport: {
          targets: [
            {
              // Console output with structured JSON for centralized logging systems
              target: 'pino/file',
              options: { 
                destination: './expense-tracker-logs/app.log', 
                mkdir: true 
              },
              level: 'info'
            },
            {
              target: 'pino/file',
              options: { destination: 1 } // this writes to STDOUT
            }
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
            ignore: 'pid,hostname',
          }
        }
    };
  
export const logger = pino(loggerOptions);

export const httpLogger = pinoHttp({ ...loggerOptions, 
    //logger, 
    customLogLevel: function (_req, res, err) {
        // if (res.statusCode >= 400 && res.statusCode < 500) {
        //   return 'warn'
        // } else if (res.statusCode >= 500 || err) {
        //   return 'error'
        // } else if (res.statusCode >= 300 && res.statusCode < 400) {
        //   return 'silent'
        // }
        return 'error';
      },
      serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
            userId: req.raw.user?.id,
            headers: {
                host: req.headers.host
            }
        }),

        res: (res) => ({
            statusCode: res.statusCode,
            //userId: res.raw.req.user?.id
        }),
      },
      base: null,
      customProps: (req: any, res) => {
          return {
              userId: req.user?.id
          }
      },
      customErrorMessage(_req, _res, error) {
          console.log("custom", error);
          return 'Pee Poo!';
      },
});

