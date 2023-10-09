import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/new')
  getPrint(): string {
    return this.appService.getPrint();
  }
  @Get('/cons')
  testing(): string {
    return this.appService.testConsole();
  }
}
