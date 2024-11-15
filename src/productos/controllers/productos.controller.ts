//El controlador se enfoca solo en manejar las rutas y solicitudes.

import { Controller, Get, Post, Put, Param, Body, Delete, Query } from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO, FilterProductDTO } from 'src/productos/dtos/productos.dto';
import { ProductosService } from 'src/productos/services/productos.service';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private productsServices: ProductosService) {}

  // Decorador y método para obtener todos los productos
  @Get()
  @ApiOperation({ summary: 'Catálogo con todos los productos' })
  getProducts(@Query() params: FilterProductDTO) {
    return this.productsServices.findAll(params);
  }

  // Decorador y método para obtener producto por ID
  @Get(':idProduct')
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  getProductById(@Param('idProduct', ParseIntPipe) idProduct: number) {
    return this.productsServices.findOne(idProduct);
  }

  // Decorador y método para crear un producto
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  createProduct(@Body() payload: CreateProductDTO) {
    return this.productsServices.create(payload);
  }

  // Decorador y método para modificar productos
  @Put(':idProduct')
  @ApiOperation({ summary: 'Modificar un producto existente' })
  updateProducto(
    @Param('idProduct', ParseIntPipe) idProduct: number,
    @Body() payload: UpdateProductDTO,
  ) {
    return this.productsServices.update(idProduct, payload);
  }

  // Decorador y método para eliminar productos por ID
  @Delete(':idProduct')
  @ApiOperation({ summary: 'Eliminar un producto por su ID' })
  deleteProduct(@Param('idProduct', ParseIntPipe) idProduct: number): any {
    return this.productsServices.remove(idProduct);
  }

  // Agregar categoría a un producto
  @Put(':idProduct/category/:categoryId')
  @ApiOperation({ summary: 'Agregar una categoría a un producto' })
  addCategoryToProduct(
    @Param('idProduct', ParseIntPipe) idProduct: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsServices.addCategoryToProduct(idProduct, categoryId);
  }

  // Remover categoría de un producto
  @Delete(':idProduct/category/:categoryId')
  @ApiOperation({ summary: 'Remover una categoría de un producto' })
  removeCategoryByProduct(
    @Param('idProduct', ParseIntPipe) idProduct: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsServices.removeCategoryByProduct(idProduct, categoryId);
  }
}
