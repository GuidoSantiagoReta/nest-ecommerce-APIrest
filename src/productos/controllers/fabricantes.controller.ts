import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('fabricantes')
export class FabricantesController {
  //Decorador y método para obtener producto por ID
  @Get('/:nombre/productos/:productId')
  getCategory(
    @Param('productId') productId: string,
    @Param('nombre') nombre: string,
  ) {
    return `El ID del producto es ${productId} del fabricante ${nombre}`;
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
  @Put(':idFabricante')
  updateFabricante(
    @Param('idFabricante') idFabricante: string,
    @Body() body: any,
  ): any {
    return {
      idFabricante: idFabricante,
      nombre: body.nombre,
      origen: body.origen,
    };
  }

  //Decorador y método para eliminar productos por ID
  @Delete(':idFabricante')
  deleteFabricante(@Param('idFabricante') idFabricante: string): any {
    return {
      idFabricante: idFabricante,
      delete: true,
      count: 1,
    };
  }
}