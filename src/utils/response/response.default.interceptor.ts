import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Type,
  mixin,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { responseInfo } from '../../constants/response';

export function ResponseDefaultInterceptor(
  messagePath: string,
): Type<NestInterceptor> {
  @Injectable()
  class MixinResponseDefaultInterceptor
    implements NestInterceptor<Promise<any>>
  {
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<Promise<any> | string>> {
      if (context.getType() === 'http') {
        return next.handle().pipe(
          map(async (responseData: Promise<Record<string, any>>) => {
            const ctx: HttpArgumentsHost = context.switchToHttp();
            const response: Response = ctx.getResponse();
            const statusCode = response.statusCode;

            // Getting response information using response name
            const responseStatusMessage = responseInfo?.[messagePath];

            // Getting response messages
            const responseMessage =
              responseStatusMessage?.message ?? messagePath;

            // Getting response status code
            const responseStatusCode =
              responseStatusMessage?.statusCode ?? statusCode;

            let customMetadata;
            let customData;
            if (typeof responseData == 'object') {
              const { metadata, ...data } = await responseData;
              customMetadata = metadata;
              if (!data.data) customData = data;
              else customData = data.data;
            } else if (typeof responseData == 'string') {
              customData = responseData;
            }

            return {
              statusCode: responseStatusCode,
              message: responseMessage,
              data: customData,
              metadata: customMetadata,
            };
          }),
        );
      }

      return next.handle();
    }
  }

  return mixin(MixinResponseDefaultInterceptor);
}
