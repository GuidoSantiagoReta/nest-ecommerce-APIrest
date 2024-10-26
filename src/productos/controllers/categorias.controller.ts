import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  // Decorador y método para obtener una categoría por ID
  @Get(':idCategoria')
  @ApiOperation({ summary: 'Obtener una categoría por su ID' })
  getCategoria(@Param('idCategoria') idCategoria: string): string {
    return `El ID de la categoría es: ${idCategoria}`;
  }

  // Decorador y método para crear una nueva categoría
  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  create(@Body() payload: any) {
    return {
      message: 'Acción de crear',
      payload,
    };
  }

  // Decorador y método para modificar una categoría
  @Put(':idCategoria')
  @ApiOperation({ summary: 'Modificar una categoría existente' })
  updateCategoria(
    @Param('idCategoria') idCategoria: string,
    @Body() body: any,
  ): any {
    return {
      idCategoria: idCategoria,
      nombre: body.nombre,
      imagen: body.imagen,
    };
  }

  // Decorador y método para eliminar una categoría por ID
  @Delete(':idCategoria')
  @ApiOperation({ summary: 'Eliminar una categoría por su ID' })
  deleteCategoria(@Param('idCategoria') idCategoria: string): any {
    return {
      idCategoria: idCategoria,
      delete: true,
      count: 1,
    };
  }
}
