import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ErrorHttpFilter } from './erro.http.filter';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorHttpFilter,
    },
  ],
  imports: [],
})
export class ErrorModule {}
