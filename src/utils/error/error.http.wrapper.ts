import { HttpException } from '@nestjs/common';
import { DEFAULT_ERROR, ERROR, errorConfig } from '../../constants/error';
import { IFieldError } from './error.interface';

export class HttpExceptionWrapper extends HttpException {
  constructor(
    error?: ERROR,
    errors?: Partial<IFieldError> & Record<string, any>,
    logs?: {
      name?: string;
      info?: Record<string, any>;
    },
  ) {
    /**
     * Error Information
     * Default Error is if not given
     */

    const isForeignKeyConstraintError =
      errors?.['name'] === 'SequelizeForeignKeyConstraintError';

    const isSequelizeValidationError =
      errors?.['name'] === 'SequelizeValidationError';

    let resultErrors: IFieldError[] | undefined = undefined;

    if (isSequelizeValidationError) {
      resultErrors = errors?.errors?.map((item: any) => ({
        field: item.path,
        error: item.message,
      }));
    }

    if (isForeignKeyConstraintError) {
      const constraint: string = errors?.parent?.constraint ?? '';
      const tableName: string = errors?.parent?.table ?? '';
      const keyNameArr = constraint.split(`${tableName}_`);
      const keyName = keyNameArr[keyNameArr.length - 1]?.replace('_fkey', '');

      resultErrors = [
        {
          field: tableName,
          error: `Foreign key constraint: ${keyName}`,
        },
        {
          field: 'keyName',
          error: `${keyName} is not valid entry`,
        },
      ];
    }

    const isSequelizeError =
      isSequelizeValidationError || isForeignKeyConstraintError;

    const mainError: ERROR = isSequelizeError
      ? DEFAULT_ERROR.SEQUELIZE_VALIDATION
      : error;

    const defaultError: ERROR = isSequelizeError
      ? DEFAULT_ERROR.SEQUELIZE_VALIDATION
      : DEFAULT_ERROR.DEFAULT;

    const errorInfo = errorConfig[mainError ?? defaultError];

    super(
      { ...errorInfo, errors: resultErrors ?? errors, logs },
      errorInfo.statusCode,
    );
  }
}

export class DefaultError extends Error {
  field: string;
  error: string;
  constructor(field: string, error: string) {
    super();
    this.name = 'DefaultError';
    this.field = field;
    this.error = error;
  }
}
