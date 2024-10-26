import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Pedidos') // Apitags para Swagger
@Controller('pedidos')
export class PedidosController {
  @Get('/:nombreComprador/:idPedido')
  @ApiOperation({ summary: 'Obtener un pedido por nombre de comprador e ID' })
  getPedido(
    @Param('idPedido') idPedido: string,
    @Param('nombreComprador') nombreComprador: string,
  ) {
    return `El id del pedido es: ${idPedido} del comprador ${nombreComprador}`;
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  create(@Body() payload: any) {
    return {
      message: 'Acción de crear',
      payload,
    };
  }

  @Put(':idPedido')
  @ApiOperation({ summary: 'Modificar un pedido existente' })
  updatePedido(@Param('idPedido') idPedido: string, @Body() body: any): any {
    return {
      idPedido: idPedido,
      comprador: body.idComprador,
      monto: body.monto,
    };
  }

  @Delete(':idPedido')
  @ApiOperation({ summary: 'Eliminar un pedido por su ID' })
  deletePedido(@Param('idPedido') idPedido: string): any {
    return {
      idPedido: idPedido,
      delete: true,
      count: 1,
    };
  }
}