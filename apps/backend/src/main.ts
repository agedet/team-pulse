import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL') || 'https://team-pulse-zeta.vercel.app',
    methods: ['GET', 'HEAD', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'x-csrf-token'],
    credential: true,
    preflightContinue: false,
    optionsSuccessStatuses: 204,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<string>('PORT') ?? 5000);
  console.log('Server is running...keep mute');
}
bootstrap();
