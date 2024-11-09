import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FabricantesService } from '../services/fabricantes.service'
import { CreateFabricanteDto, UpdateFabricanteDto } from './../dtos/fabricantes.dto';

@ApiTags('Fabricantes')
@Controller('fabricantes')
export class FabricantesController {
  constructor(private readonly fabricantesService: FabricantesService) {}

  // Obtener todos los fabricantes
  @Get()
  @ApiOperation({ summary: 'Obtener todos los fabricantes' })
  findAll() {
    return this.fabricantesService.findAll();
  }

  // Obtener un fabricante por ID
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un fabricante por ID' })
  findOne(@Param('id') id: number) {
    return this.fabricantesService.findOne(id);
  }

  // Crear un nuevo fabricante
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo fabricante' })
  create(@Body() payload: CreateFabricanteDto) {
    return this.fabricantesService.create(payload);
  }

  // Modificar un fabricante existente
  @Put(':id')
  @ApiOperation({ summary: 'Modificar un fabricante existente' })
  update(@Param('id') id: number, @Body() payload: UpdateFabricanteDto) {
    return this.fabricantesService.update(id, payload);
  }

  // Eliminar un fabricante por ID
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un fabricante por su ID' })
  remove(@Param('id') id: number) {
    return this.fabricantesService.remove(id);
  }

  // Obtener un producto por ID y fabricante
  @Get('/:nombre/productos/:productId')
  @ApiOperation({ summary: 'Obtener un producto por ID y fabricante' })
  getCategory(
    @Param('productId') productId: string,
    @Param('nombre') nombre: string,
  ) {
    return `El ID del producto es ${productId} del fabricante ${nombre}`;
  }
}
