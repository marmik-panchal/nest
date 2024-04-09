import { INestApplication, ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { ValidationError } from 'class-validator';
import { corsOptions } from '@app/core/cors.config';
import { HttpExceptionWrapper } from '@app/utils/error/error.http.wrapper';
import { IFieldError } from '@app/utils/error/error.interface';
import { DEFAULT_ERROR } from '@app/constants/error/errors/default';
import {
  ErrorHandler,
  RequestHandler,
  ResponseHandler,
} from '@app/core/middleware';
/**
 * Core bootstrap module should be loaded here.
 * @param app
 *
 */

export default async function bootstrap(app: INestApplication) {
  // Global Prefix

  // middlewares, express specific\
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.use(helmet());

  // CORS configuration
  app.enableCors(corsOptions);

  // Auto-validation
  // We'll start by binding ValidationPipe at the application level, thus ensuring all endpoints are protected from receiving incorrect data.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, //whitelist on allows selected dto field
      transform: true, // change the string values in json to number which are defined as number
      exceptionFactory: (validationErrors: ValidationError[]) => {
        const getError = (
          error: ValidationError[],
          appendFieldName = '',
        ): IFieldError[] => {
          return error.reduce((value, error) => {
            //console.log(value, error);
            if (error.children?.length) {
              const newError = getError(
                error.children,
                `${appendFieldName}${error.property}.`,
              );
              value = [...value, ...newError];
            } else {
              value = [
                ...value,
                {
                  field: appendFieldName + error.property,
                  error: Object.values(error.constraints).join(', '),
                },
              ];
            }
            return value;
          }, [] as IFieldError[]);
        };

        return new HttpExceptionWrapper(
          DEFAULT_ERROR.DATA_VALIDATION_ERROR,
          getError(validationErrors),
        );
      },
    }),
  );

  // Bind Interceptors
  app.useGlobalInterceptors(new RequestHandler(), new ResponseHandler());

  // Error Handler
  app.useGlobalFilters(new ErrorHandler());
}
