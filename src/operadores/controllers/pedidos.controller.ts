import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PedidosService } from '../services/pedidos.service';
import { CreatePedidoDto, UpdatePedidoDto } from '../dtos/pedido.dto';
import { AddProductsToOrderDto } from '../dtos/add-products-to-order.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(id);
  }

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(id);
  }

  @Put(':id/productos') // agregar productos al array
  addProducts(@Param('id') id: string, @Body() payload: AddProductsToOrderDto) {
    return this.pedidosService.addProduct(id, payload.productsIds);
  }

  @Delete(':id/producto/:productId') // borrar un producto del array
  removeProduct(@Param('id') id: string, @Param('productId') productId: string) {
    return this.pedidosService.removeProduct(id, productId);
  }
}




