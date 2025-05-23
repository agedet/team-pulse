import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'x-csrf-token'],
    credential: true,
    preflightContinue: false,
    optionsSuccessStatuses: 204,
  });


  await app.listen(process.env.PORT ?? 5000);
  console.log('Server is running...keep mute');
}
bootstrap();
