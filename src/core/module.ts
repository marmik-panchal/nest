import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscoveryModule } from '@nestjs/core';

import config from '@app/config/index';

import { exportProvider, getProviders } from './providers';

@Global()
@Module({
  imports: [
    DiscoveryModule,
    ConfigModule.forRoot({
      envFilePath: [
        `${process.cwd()}/.env`,
        `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      ],
      isGlobal: true,
      expandVariables: true,
      load: config,
    }),
  ],
  providers: [...getProviders()],
  exports: [...exportProvider()],
})
export class CoreModule {}
