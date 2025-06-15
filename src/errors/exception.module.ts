import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './exception.filter';
import { LoggingModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggingModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class ExceptionModule {}
