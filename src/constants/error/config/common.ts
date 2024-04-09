import { HttpStatus } from '@nestjs/common';
import { ErrorConfig } from '../error.types';
import { COMMON_ERROR } from '../errors/common';

export const commonErrorConfig: ErrorConfig<COMMON_ERROR> = {
  [COMMON_ERROR.CUSTOM_COMMON_ERROR]: {
    message: 'Custom common error',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 'DEFAULT_ERROR',
  },
};
