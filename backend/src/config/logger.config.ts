import { createLogger, format, transports } from "winston";
const { combine, timestamp, colorize, label, printf } = format;

const logFormat = printf((info) => {
  const { level, message, label, timestamp, durationMs } = info;
  if (durationMs) {
    return `${timestamp} [${label}] ${level} : ${message} ${durationMs}ms`;
  }
  return `${timestamp} [${label}] ${level} : ${message}`;
});

const consoleFormat = (labelStr: string) =>
  combine(label({ label: labelStr }), timestamp(), colorize(), logFormat);

const fileFormat = (labelStr: string) =>
  combine(label({ label: labelStr }), timestamp(), logFormat);

export const serverLog = createLogger({
  transports: [
    new transports.Console({
      format: consoleFormat("server"),
    }),
    new transports.File({
      filename: "./server-log.log",
      format: fileFormat("server"),
    }),
  ],
});

export const dbLog = createLogger({
  transports: [
    new transports.Console({
      format: consoleFormat("Postgres"),
    }),
    new transports.File({
      filename: "./db-log.log",
      format: fileFormat("server"),
    }),
  ],
});
