import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class DemoController {
  private readonly logger = new Logger(DemoController.name);

  @MessagePattern({ cmd: 'echo' })
  echo(data: string): string {
    this.logger.log('Echo data invoked!');

    return `Echo: ${data}`
  }
}
