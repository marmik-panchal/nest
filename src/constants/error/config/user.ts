import { HttpStatus } from '@nestjs/common';
import { ErrorConfig } from '../error.types';
import { USER_ERROR } from '../errors/user';

export const userErrorConfig: ErrorConfig<USER_ERROR> = {
  [USER_ERROR.USER_NOT_EXIST]: {
    message: 'user not exist',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 'USER_NOT_EXIST_ERROR',
  },
  [USER_ERROR.USER_EMAIL_EXIST]: {
    message: 'email-id already exists',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 'USER_EMAIL_EXIST_ERROR',
  },
};
