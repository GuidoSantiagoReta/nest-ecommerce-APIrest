import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(ApiKeyGuard)
  @Get('nuevo')
  newEndpoint() {
    return this.appService.getNewMessage();
  }
//Ejemplo de ruta pública
  @Public()
  @Get('public')
  publicEndpoint() {
    return 'ruta pública';
  }
}


