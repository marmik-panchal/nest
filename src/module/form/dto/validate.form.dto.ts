import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ValidateFormDto {
  constructor(metadata: { [key: string]: string }) {
    Object.keys(metadata).forEach((fieldName) => {
      const fieldType = metadata[fieldName];
      switch (fieldType) {
        case 'email':
          IsEmail({}, { each: true })(this, fieldName);
          IsNotEmpty()(this, fieldName);
          break;
        case 'string':
          IsString({ each: true })(this, fieldName);
          IsNotEmpty()(this, fieldName);
          break;
        case 'number':
          IsNumber({})(this, fieldName);
          IsNotEmpty()(this, fieldName);
          break;
        case 'boolean':
          IsBoolean({})(this, fieldName);
          IsNotEmpty()(this, fieldName);
          break;
      }
    });
  }
}
