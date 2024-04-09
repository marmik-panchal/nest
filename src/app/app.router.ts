import { DynamicModule, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { FormModule } from 'src/module/form/form.module';
const dynamicModule = [
  {
    path: 'form',
    module: FormModule,
  },
];

@Module({})
export class AppRouterModule {
  static register(): DynamicModule {
    return {
      module: AppRouterModule,
      imports: [
        ...dynamicModule.map((item) => item.module),
        RouterModule.register(dynamicModule),
      ],
    };
  }
}
