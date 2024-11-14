import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';
import { Comprador } from '../entities/comprador.entity';
import { CreatePedidoDto, UpdatePedidoDto } from '../dtos/pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
    @InjectRepository(Comprador) private compradorRepo: Repository<Comprador>,
  ) {}

  findAll() {
    return this.pedidoRepo.find();
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepo.findOne(id, {
      //relations: ['detalles', 'detalles.producto'],
    });
    if (!pedido) {
      throw new NotFoundException('No encontrado');
    }
    return pedido;
  }

  async create(data: CreatePedidoDto) {
    const pedido = new Pedido();
    if (data.compradorId) {
      const comprador = await this.compradorRepo.findOne(data.compradorId);
      pedido.comprador = comprador;
    }
    return this.pedidoRepo.save(pedido);
  }

  async update(id: number, changes: UpdatePedidoDto) {
    const pedido = await this.pedidoRepo.findOne(id);
    if (changes.compradorId) {
      const comprador = await this.compradorRepo.findOne(changes.compradorId);
      pedido.comprador = comprador;
    }
    return this.pedidoRepo.save(pedido);
  }

  remove(id: number) {
    return this.pedidoRepo.delete(id);
  }
}
