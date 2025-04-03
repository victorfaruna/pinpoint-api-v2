import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes unknown properties
      forbidNonWhitelisted: true, // Throws an error for unknown properties
      transform: true, // Automatically transforms input to DTO type
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
