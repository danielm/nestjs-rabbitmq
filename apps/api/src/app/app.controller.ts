import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(@Inject('DEMO_RMQ_SERVICE') private client: ClientProxy) {}

  @Get()
  getData() {
    return { message: 'Hello API' };
  }

  @Get('/enqueue')
  enqueueDemo() {
    const pattern = { cmd: 'echo' };
    const payload = "World";

    this.client.send<string>(pattern, payload);

    this.logger.log('Enqueued echo message!');

    return { message: 'It works' };
  }
}
