import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Form } from '@app/module/form/entities/form.entity';
import { FormService } from '@app/module/form/services/form.service';
import { FormRepository } from '@app/module/form/repository/form.repository';
import { FormController } from '@app/module/form/controller/form.controller';
import { FormField } from './entities/formfield.entity';
import { FilldataController } from './controller/filldata.controller';
import { FormFillData } from './entities/formfilldata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form, FormField, FormFillData])],
  exports: [TypeOrmModule, FormService],
  providers: [FormService, FormRepository],
  controllers: [FormController, FilldataController],
})
export class FormModule {}
