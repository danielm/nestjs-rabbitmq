import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class DemoController {
  private readonly logger = new Logger(DemoController.name);

  @MessagePattern({ cmd: 'echo' })
  echo(data: string): string {
    this.logger.log('Echo data invoked!');

    return `Echo: ${data}`;
  }

  @EventPattern('my_event_name')
  async handleMyEvent(data: Record<string, unknown>) {
    this.logger.log(data, 'My event recieved');
  }
}
