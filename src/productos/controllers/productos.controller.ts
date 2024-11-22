//El controlador se enfoca solo en manejar las rutas y solicitudes.
import { Controller, Get, Post, Put, Param, Body, Delete, Query } from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO, FilterProductsDTO } from '../dtos/productos.dto';
import { ProductosService } from '../services/productos.service';
import { MongoIdPipe } from '../../common/pipes/mongo-id.pipe';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@Controller('productos')
@ApiTags('Productos') 
export class ProductosController {
  constructor(private productsServices: ProductosService) {}

  @Get()
  @ApiOperation({ summary: 'Registros de productos' })
  findAll(@Query() params: FilterProductsDTO) {
    return this.productsServices.findAll(params);
  }

  @Get(':idProduct')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  getOne(@Param('idProduct', MongoIdPipe) idProduct: string) {
    return this.productsServices.findOne(idProduct);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un producto' })
  @ApiBody({ type: CreateProductDTO })
  create(@Body() payload: CreateProductDTO) {
    return this.productsServices.create(payload);
  }

  @Put(':idProduct')
  @ApiOperation({ summary: 'Actualizar un producto' })
  update(@Param('idProduct', MongoIdPipe) idProduct: string, @Body() payload: UpdateProductDTO) {
    return this.productsServices.update(idProduct, payload);
  }

  @Delete(':idProduct')
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  delete(@Param('idProduct', MongoIdPipe) idProduct: string) {
    return this.productsServices.remove(idProduct);
  }
}


