import { NestFactory } from '@nestjs/core';
import {ValidationPipe} from "@nestjs/common";
import { AppModule } from './Controllers/app/app.module';
import { setupSwagger } from './data/Configuration/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(4000);
}
bootstrap();
