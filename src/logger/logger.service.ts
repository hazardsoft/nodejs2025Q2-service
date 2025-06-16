import { Injectable } from '@nestjs/common';
import { logLevel } from './consts';

export const enum LogLevel {
  'verbose' = 1,
  'debug' = 2,
  'log' = 3,
  'warn' = 4,
  'error' = 5,
  'fatal' = 6,
}

@Injectable()
export class LoggingService {
  log(level: LogLevel, message: string) {
    if (level >= logLevel) {
      console.log(message);
    }
  }
}
