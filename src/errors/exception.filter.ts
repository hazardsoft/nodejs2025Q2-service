import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { StatusCodes } from 'http-status-codes';
import { LoggingService } from 'src/logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly logginService: LoggingService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : StatusCodes.INTERNAL_SERVER_ERROR;

    const cause = exception instanceof HttpException ? exception.message : null;

    this.logginService.log(
      'error',
      `error with status code ${statusCode} occured, cause ${cause}`,
    );

    const responseBody = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    if (cause) {
      Object.assign(responseBody, { error: cause });
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
