import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Fabricantes')
@Controller('fabricantes')
export class FabricantesController {
  // Decorador y método para obtener un producto por ID del fabricante
  @Get('/:nombre/productos/:productId')
  @ApiOperation({ summary: 'Obtener un producto por ID y fabricante' })
  getCategory(
    @Param('productId') productId: string,
    @Param('nombre') nombre: string,
  ) {
    return `El ID del producto es ${productId} del fabricante ${nombre}`;
  }

  // Decorador y método para crear un nuevo fabricante
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo fabricante' })
  create(@Body() payload: any) {
    return {
      message: 'Acción de crear',
      payload,
    };
  }

  // Decorador y método para modificar un fabricante
  @Put(':idFabricante')
  @ApiOperation({ summary: 'Modificar un fabricante existente' })
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

  // Decorador y método para eliminar un fabricante por ID
  @Delete(':idFabricante')
  @ApiOperation({ summary: 'Eliminar un fabricante por su ID' })
  deleteFabricante(@Param('idFabricante') idFabricante: string): any {
    return {
      idFabricante: idFabricante,
      delete: true,
      count: 1,
    };
  }
}