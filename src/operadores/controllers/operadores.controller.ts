import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';


@Controller('operadores')
export class OperadoresController {
  //Decorador y método para obtener producto por ID

  @Get(':idOperador')
  getOperador(@Param('idOperador') idOperador: string): string {
    return `El id del operador es: ${idOperador}`;
  }
  //Decorador y método para crear un producto
  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Acción de crear',
      payload,
    };
  }

  //Decorador y método para modificar productos
  @Put(':idOperador')
  updateOperador(@Param('idOperador') idOperador: string, @Body() body: any) {
    return {
      idOperador: idOperador,
      nombre: body.nombre,
      origen: body.origen,
    };
  }
  //Decorador y método para eliminar productos por ID
  @Delete(':idOperador')
  deleteOperador(@Param('idOperador') idOperador: string): any {
    return {
      idOperador: idOperador,
      delete: true,
      count: 1,
    };
  }
}

