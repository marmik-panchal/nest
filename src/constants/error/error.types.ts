import { HttpStatus } from '@nestjs/common';

export type ErrorConfig<TError extends string = string> = Record<
  TError,
  {
    message: string;
    statusCode: HttpStatus;
    errorCode: `${Uppercase<string>}_ERROR`;
  }
>;
