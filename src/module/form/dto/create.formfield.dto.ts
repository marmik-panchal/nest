import { ApiProperty } from '@nestjs/swagger';

import { apiResponse } from '@app/module/form/constants/api.response.dto';
import { Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

export class CreateFormFieldDto {
  @ApiProperty(apiResponse.apiCreateFormFieldProperty)
  @IsNotEmpty()
  @Column()
  field_name: string;

  @ApiProperty(apiResponse.apiCreateFormFieldTypeProperty)
  @IsNotEmpty()
  @Column()
  field_type: string;
}
