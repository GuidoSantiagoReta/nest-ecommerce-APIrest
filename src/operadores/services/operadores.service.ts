import { Injectable, NotFoundException } from '@nestjs/common';
import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/pedido.entity';
import { ProductosService } from './../../productos/services/productos.service';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OperadoresService {
  constructor(
    @InjectModel(Operador.name) private operadorModel: Model<Operador>,
    @InjectModel(Pedido.name) private pedidoModel: Model<Pedido>,
    private readonly productsService: ProductosService,
  ) {}

  async getOrderByUser(id: string): Promise<Pedido> {
    const operador = await this.operadorModel.findById(id).exec();
    if (!operador) {
      throw new NotFoundException(`Operador con ID #${id} no encontrado`);
    }

    const products = await this.productsService.findAll();

    const newPedido = new this.pedidoModel({
      date: new Date(),
      operador: operador._id,
      products,
    });

    return newPedido.save();
  }

  
}



