import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getPrint(): string {
    return "i'm learning nestjs";
  }
}
