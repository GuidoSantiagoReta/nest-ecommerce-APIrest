import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('pedidos')
export class PedidosController {
  //Decorador y método para obtener producto por ID
  @Get('/:nombreComprador/:idPedido')
  getPedido(
    @Param('idPedido') idPedido: string,
    @Param('nombreComprador') nombreComprador: string,
  ) {
    return `El id del pedido es: ${idPedido} del comprador ${nombreComprador}`;
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
  @Put(':idPedido')
  updatePedido(@Param('idPedido') idPedido: string, @Body() body: any): any {
    return {
      idPedido: idPedido,
      comprador: body.idComprador,
      monto: body.monto,
    };
  }
  //Decorador y método para eliminar productos por ID
  @Delete(':idPedido')
  deletePedido(@Param('idPedido') idPedido: string): any {
    return {
      idPedido: idPedido,
      delete: true,
      count: 1,
    };
  }
}
