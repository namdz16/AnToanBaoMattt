import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://10.20.122.187:3000', 'http://localhost:3000'],
    credentials: true,
  });

  const port = process.env.PORT || 9000;
  await app.listen(port);
  Logger.log(`🚀 Server is running on http://localhost:${port}/graphql`);
}

bootstrap();
