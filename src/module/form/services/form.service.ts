import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FormRepository } from '@app/module/form/repository/form.repository';
import { constant } from '@app/constants/constant';
import { apiResponse } from '../constants/api.response.dto';
import { ValidateFormDto } from '../dto/validate.form.dto';
import { validate } from 'class-validator';
import { DEFAULT_ERROR } from '@app/constants/error/errors/default';

@Injectable()
export class FormService {
  constructor(private formRepository: FormRepository) {}

  async createForm(payload: any): Promise<string | HttpException> {
    const formData = { title: payload.title };
    delete payload.title;

    let validationErrorFlag = false;
    for (const prop of Object.keys(payload)) {
      if (!constant.allowedFieldType.includes(payload[prop])) {
        validationErrorFlag = true;
      }
    }

    if (validationErrorFlag) {
      throw new HttpException(
        `The form field type should be one of ${constant.allowedFieldType.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const checkFormTitle = await this.formRepository.count(formData.title);
    if (checkFormTitle > 0) {
      throw new HttpException(
        `Form Title already exist!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const formId = await this.formRepository.createForm(formData);
    if (!formId) {
      throw new HttpException(`Something went wrong!`, HttpStatus.BAD_REQUEST);
    }

    for (const prop of Object.keys(payload)) {
      const formFieldItem = {
        field_name: prop,
        field_type: payload[prop],
        form_id: formId,
      };
      await this.formRepository.saveFormField(formFieldItem);
    }

    return apiResponse.apiFormCreatedResponse;
  }

  arrayFindObjectByProp = (arr, prop, val) => {
    return arr.find((obj) => obj[prop] == val);
  };

  isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  async fillFormData(title: string, fillData: any) {
    const form = await this.formRepository.find(title);
    if (!form) {
      throw new NotFoundException('Form not found');
    }

    const formFields = await this.formRepository.findFields(form.id);
    const fieldDetails = {};
    const prepareInsertData = [];
    let lastEntry = await this.formRepository.findLastFormEntryId();
    lastEntry++;
    formFields.forEach((item) => {
      fieldDetails[item.field_name] = item.field_type;
      prepareInsertData.push({
        form_entry_id: lastEntry,
        form_field_id: item.id,
        form_field_value: fillData[item.field_name],
      });
    });

    const validateDtoObj = new ValidateFormDto(fieldDetails);
    Object.assign(validateDtoObj, fillData);
    const formValidation = await validate(validateDtoObj);

    if (formValidation.length > 0) {
      throw new HttpException(
        DEFAULT_ERROR.DATA_VALIDATION_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.formRepository.fillFormData(prepareInsertData);

    return apiResponse.apiFormDataInsertResponse;
  }

  async getFormData(title: string) {
    const form = await this.formRepository.find(title);
    if (!form) {
      throw new HttpException('Form not found', HttpStatus.BAD_REQUEST);
    }

    const formFields = await this.formRepository.findFields(form.id);
    const fieldIdsToCatch = formFields.map((ele) => ele.id);

    const formFieldItem = [];
    const formEntries =
      await this.formRepository.findFormEntries(fieldIdsToCatch);
    const entriesToWatch = formEntries.map((ele) => ele.form_entry_id);
    for (let i = 0; i < entriesToWatch.length; i++) {
      const items = await this.formRepository.findFillFormDataBYEntryId(
        entriesToWatch[i],
      );
      const appendItem = [];
      for (let j = 0; j < items.length; j++) {
        const fieldObj = this.arrayFindObjectByProp(
          formFields,
          'id',
          items[j].form_field_id,
        );
        const fieldName = fieldObj.field_name;
        appendItem[fieldName] = items[j].form_field_value;
      }

      formFieldItem.push({ entry: entriesToWatch[i], ...appendItem });
    }

    return formFieldItem;
  }
}
