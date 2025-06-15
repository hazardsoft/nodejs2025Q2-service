import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { finished } from 'node:stream';
import { LoggingService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logginService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = new Date().getTime();
    next();
    finished(res, () => {
      const end = new Date().getTime();
      const query: string = req.query ? JSON.stringify(req.query) : '';
      const params: string = req.params ? JSON.stringify(req.params) : '';
      const body: string = req.body ? JSON.stringify(req.body) : '';
      const executionTime: string = `${end - start}`;

      this.logginService.log(
        'info',
        `${req.method} ${req.url}, query ${query}, params ${params}, body ${body} - status code ${res.statusCode} (${executionTime}ms)`,
      );
    });
  }
}
