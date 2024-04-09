import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { apiResponse } from '@app/module/form/constants/api.response.dto';

import { FormService } from '@app/module/form/services/form.service';

@ApiTags('form_api')
@Controller('fill_data')
export class FilldataController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @ApiCreatedResponse({ description: apiResponse.apiFormCreatedResponse })
  @ApiQuery({ name: 'title', type: 'string', required: false })
  async saveFillFormData(@Query('form_title') form_title, @Body() body: any) {
    return await this.formService.fillFormData(form_title, body);
  }

  @Get()
  @ApiQuery({ name: 'title', type: 'string', required: false })
  async getFillFormData(@Query('form_title') form_title) {
    return await this.formService.getFormData(form_title);
  }
}
