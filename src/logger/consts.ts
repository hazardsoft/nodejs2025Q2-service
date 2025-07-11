import { LogLevel } from './logger.service';

export const logLevel: LogLevel =
  (Number(process.env.LOG_LEVEL) as LogLevel) ?? LogLevel.log;
