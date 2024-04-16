import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      cache: true,
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'DEMO_RMQ_SERVICE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            queue: configService.get<string>('RMQ_PRODUCER_QUEUE'),
            urls: [configService.get<string>('RMQ_PRODUCER_URL')],
            noAck: configService.get<boolean>('RMQ_PRODUCER_QUEUE_NOACK'),
            queueOptions: {
              durable: configService.get<boolean>('RMQ_PRODUCER_QUEUE_DURABLE'),
            },
          },
        }),
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
