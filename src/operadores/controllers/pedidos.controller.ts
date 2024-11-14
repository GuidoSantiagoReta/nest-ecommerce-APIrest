import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PedidosService } from './../services/pedidos.service';
import { CreatePedidoDto, UpdatePedidoDto } from './../dtos/pedido.dto';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private pedidosService: PedidosService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pedidos' })
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pedido por ID' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  create(@Body() payload: CreatePedidoDto) {
    return this.pedidosService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modificar un pedido existente' })
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdatePedidoDto) {
    return this.pedidosService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un pedido por su ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.remove(id);
  }
}
