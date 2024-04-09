import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Form } from '@app/module/form/entities/form.entity';
import { FormField } from '../entities/formfield.entity';
import { FormFillData } from '../entities/formfilldata.entity';

@Injectable()
export class FormRepository {
  constructor(
    @InjectRepository(Form) private formRepository: Repository<Form>,
    @InjectRepository(FormField)
    private formfieldRepository: Repository<FormField>,
    @InjectRepository(FormFillData)
    private formfillDataRepository: Repository<FormFillData>,
  ) {}

  createForm(title: { title: string }) {
    const newForm = this.formRepository.create(title);

    return this.formRepository.save(newForm).then((formObj) => {
      return formObj.id;
    });
  }

  saveFormField(formFieldItem: {
    field_name: string;
    field_type: string;
    form_id: string;
  }) {
    return this.formfieldRepository.save(formFieldItem);
  }

  fillFormData(fillData: any) {
    console.log(fillData, 'fillData');
    return this.formfillDataRepository.save(fillData);
  }

  find(title: string) {
    return this.formRepository.findOne({ where: { title: title } });
  }

  count(title: string) {
    return this.formRepository.count({ where: { title: title } });
  }

  findFields(formId: string) {
    return this.formfieldRepository.find({
      select: {
        field_name: true,
        field_type: true,
        id: true,
      },
      where: { form_id: formId },
    });
  }

  findFormEntries(fieldIdsToCatch: number[]) {
    return this.formfillDataRepository
      .createQueryBuilder()
      .select('form_entry_id')
      .where({ form_field_id: In(fieldIdsToCatch) })
      .groupBy('form_entry_id')
      .getRawMany();
  }

  findFillFormData(fieldIdsToCatch: number[]) {
    return this.formfillDataRepository.find({
      where: { form_field_id: In(fieldIdsToCatch) },
    });
  }

  findFillFormDataBYEntryId(form_entry_id: number) {
    return this.formfillDataRepository.find({
      where: { form_entry_id: form_entry_id },
    });
  }

  findLastFormEntryId() {
    return this.formfillDataRepository.maximum('form_entry_id');
  }
}
