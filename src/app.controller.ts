import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // método para acceder a la Tarea Asíncrona
  @Get('usefactory')
  getUseFactory(): string {
    return this.appService.getUseFactory();
  }
}
