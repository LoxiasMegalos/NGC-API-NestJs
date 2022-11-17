import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00'
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  })
  
  await app.listen(3000);
}
bootstrap();
