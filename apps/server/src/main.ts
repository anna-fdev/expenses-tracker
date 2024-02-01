import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const { SERVER_PORT = 3000 } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Expenses API')
    .setDescription('Expenses API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(SERVER_PORT);

  Logger.log(
    `🚀 Application is running on: http://localhost:${SERVER_PORT}/${globalPrefix}`
  );
}

bootstrap();
