//El controlador se enfoca solo en manejar las rutas y solicitudes.

import { Controller, Get,Post,Put,Param,Body,Delete,} from '@nestjs/common';
import {CreateProductDTO,UpdateProductDTO,} from 'src/dtos/productos.dto';
import { ProductosService } from 'src/services/productos/productos.service';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';

@Controller('productos')
export class ProductosController {
  constructor(private productsServices: ProductosService) {}
  //Decorador y método para obtener todos los productos

  @Get('obtener')
  findAll() {
    return this.productsServices.findAll(); // utiliza el servicio ProductosService para obtener todos los productos
    //return "Obtener todos los productos";
  }

  //Decorador y método para obtener producto por ID
  @Get(':idProduct')
  getProductById(@Param('idProduct', ParseIntPipe) idProduct: number) {
    return `obtener el producto por ID: ${idProduct} `;
  }
  //Decorador y método para crear un producto
  @Post()
  createProduct(@Body() payload: CreateProductDTO) {
    //se agrega dto 3/10
    return {
      message: 'crear producto',
      payload,
    };
  }
  //Decorador y método para modificar productos
  @Put('product/:idProduct')
  updateProducto(
    @Param('idProduct', ParseIntPipe) idProduct: number,
    @Body() payload: UpdateProductDTO,
  ) {
    return this.productsServices.update(idProduct, payload);
  }
  //Decorador y método para eliminar productos por ID
  @Delete(':idProduct')
  deleteProduct(@Param('idProduct', ParseIntPipe) idProduct: number): any {
    return this.productsServices.remove(idProduct);
  }
}
