import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
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

  @Get('/estoyok')
  getEstoyOK(): string{
    return'Sigo OK con /';
  }
//Ejemplo de ruta pública
  @Public()
  @Get('public')
  publicEndpoint() {
    return 'ruta pública';
  }
  //@SetMetadata('isPublic', true)
  @Get('nuevo')
  getNuevo(): string {
    return 'Metodo para probar guardian';
  }
}


