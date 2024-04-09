import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ResponseDefaultInterceptor } from './response.default.interceptor';

export function Response(messagePath: string) {
  return applyDecorators(
    UseInterceptors(ResponseDefaultInterceptor(messagePath)),
  );
}
