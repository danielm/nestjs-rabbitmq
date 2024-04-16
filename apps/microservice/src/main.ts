/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Workaround: see https://github.com/nestjs/nest/issues/2343
  const ctx = await NestFactory.createApplicationContext(AppModule);
  const config = ctx.get<ConfigService>(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [config.get<string>('RMQ_PRODUCER_URL')],
        queue: config.get<string>('RMQ_PRODUCER_QUEUE'),
        noAck: config.get<boolean>('RMQ_PRODUCER_QUEUE_NOACK'),
        queueOptions: {
          durable: config.get<boolean>('RMQ_PRODUCER_QUEUE_DURABLE'),
        },
      },
    }
  );

  // Workaround: see https://github.com/nestjs/nest/issues/2343
  ctx.close();

  await app.listen();
}

bootstrap();
