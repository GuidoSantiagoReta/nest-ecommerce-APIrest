import { Controller, Post, Body } from '@nestjs/common';
import { CreateDetallePedidoDto } from '../dtos/detallePedido.dto';
import { DetallePedidoService } from '../services/detalle-pedido.service';

@Controller('detalle-pedido')
export class DetallePedidoController {
  constructor(private  detalleService: DetallePedidoService) {}

  @Post()
  create(@Body() payload: CreateDetallePedidoDto) {
    return this.detalleService.create(payload);
  }
}
