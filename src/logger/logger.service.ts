import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService {
  log(level: string, message: string) {
    console.log(message);
  }
}
