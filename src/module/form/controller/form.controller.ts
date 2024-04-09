import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { apiResponse } from '@app/module/form/constants/api.response.dto';
import { CreateFormDto } from '@app/module/form/dto/create.form.dto';
import { FormService } from '@app/module/form/services/form.service';

@ApiTags('form_api')
@Controller()
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @ApiCreatedResponse({ description: apiResponse.apiFormCreatedResponse })
  @ApiBody({ type: CreateFormDto })
  async saveForm(@Body() body: CreateFormDto) {
    return await this.formService.createForm(body);
  }
}
