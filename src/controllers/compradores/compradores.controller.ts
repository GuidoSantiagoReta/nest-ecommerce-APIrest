import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';



@Controller('compradores')
export class CompradoresController {
  //Decorador y método para obtener producto por ID
  @Get(':idComprador')
  getComprador(@Param('idComprador') idComprador: string): string {
    return `El identificador del comprador es: ${idComprador}`;
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

  @Put(':idComprador')
  updateComprador(
    @Param('idComprador') idComprador: string,
    @Body() body: any,
  ) {
    return {
      idComprador: idComprador,
      nombre: body.nombre,
      email: body.email,
    };
  }
  //Decorador y método para eliminar productos por ID
  @Delete(':idComprador')
  deleteComprador(@Param('idComprador') idComprador: string): any {
    return {
      idComprador: idComprador,
      delete: true,
      count: 1,
    };
  }
}
