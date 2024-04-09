import { defaultErrorConfig } from './config/default';
import { commonErrorConfig } from './config/common';
import { userErrorConfig } from './config/user';
import { DEFAULT_ERROR } from './errors/default';
import { COMMON_ERROR } from './errors/common';
import { USER_ERROR } from './errors/user';

export type ERROR = DEFAULT_ERROR | COMMON_ERROR | USER_ERROR;

export { DEFAULT_ERROR, COMMON_ERROR, USER_ERROR };

export const errorConfig = {
  ...defaultErrorConfig,
  ...commonErrorConfig,
  ...userErrorConfig,
};
