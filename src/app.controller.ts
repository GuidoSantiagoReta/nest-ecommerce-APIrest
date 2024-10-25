import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('App') //para Swagger
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Endpoint principal de la aplicación' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('usefactory')
  @ApiOperation({ summary: 'Ejemplo de uso de UseFactory' })
  getUseFactory(): string {
    return this.appService.getUseFactory();
  }

  @Get('tasks')
  @ApiOperation({ summary: 'Obtener las tareas de la base de datos' })
  tasks() {
    return this.appService.getTasks();
  }
}
