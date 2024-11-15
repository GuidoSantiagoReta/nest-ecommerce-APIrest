import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';
import { DetallePedido } from '../entities/detallePedido.entity';
import { Producto } from './../../productos/entities/producto.entity';
import { CreateDetallePedidoDto } from '../dtos/detallePedido.dto';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
    @InjectRepository(DetallePedido) private detalleRepo: Repository<DetallePedido>,
    @InjectRepository(Producto) private productoRepo: Repository<Producto>,
  ) {}

  async create(data: CreateDetallePedidoDto) {
    const pedido = await this.pedidoRepo.findOne(data.pedidoId, { relations: ['comprador'] });
    const producto = await this.productoRepo.findOne(data.productoId);

    if (!pedido) {
      throw new NotFoundException(`Pedido with ID ${data.pedidoId} not found`);
    }
    if (!producto) {
      throw new NotFoundException(`Producto with ID ${data.productoId} not found`);
    }

    const detalle = new DetallePedido();
    detalle.pedido = pedido;
    detalle.producto = producto;
    detalle.cantidad = data.cantidad;

    const savedDetalle = await this.detalleRepo.save(detalle);
    
    const detalleCompleto = await this.detalleRepo.findOne({ 
      where: { id: savedDetalle.id }, 
      relations: ['pedido', 'producto']
    });

    return detalleCompleto;
  }
}

