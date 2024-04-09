import { ApiProperty } from '@nestjs/swagger';

import { apiResponse } from '@app/module/form/constants/api.response.dto';
import { Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

export class CreateFormDto {
  @ApiProperty(apiResponse.apiCreateFormTitleProperty)
  @IsNotEmpty()
  @Column()
  title: 'string';

  @ApiProperty(apiResponse.apiCreateFormFieldProperty)
  @Column()
  name: string;
}
