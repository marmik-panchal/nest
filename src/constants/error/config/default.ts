import { HttpStatus } from '@nestjs/common';
import { ErrorConfig } from '../error.types';
import { DEFAULT_ERROR } from '../errors/default';

export const defaultErrorConfig: ErrorConfig<DEFAULT_ERROR> = {
  [DEFAULT_ERROR.DEFAULT]: {
    message: 'Something went wrong',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 'DEFAULT_ERROR', // Make enum of error code (same are used)
  },
  [DEFAULT_ERROR.INVALID_USER]: {
    message: 'Not valid user to do perform particular activity',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 'INVALID_USER_ERROR',
  },
  [DEFAULT_ERROR.DATA_VALIDATION_ERROR]: {
    message: 'Data validation error',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 'DATA_VALIDATION_ERROR',
  },
  [DEFAULT_ERROR.SEQUELIZE_VALIDATION]: {
    message: 'Sequelize Data validation error',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 'SEQUELIZE_DATA_VALIDATION_ERROR',
  },
};
