import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const config = app.get(ConfigService);
  const options = new DocumentBuilder()
    .setTitle(config.get('app.name'))
    .setDescription(`API Documentation for the app ${config.get('app.name')}`)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
};
