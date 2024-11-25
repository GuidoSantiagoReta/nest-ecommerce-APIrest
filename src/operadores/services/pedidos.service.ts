import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Pedido } from '../entities/pedido.entity';
import { CreatePedidoDto, UpdatePedidoDto } from '../dtos/pedido.dto';
import { AddProductsToOrderDto } from '../dtos/add-products-to-order.dto';

@Injectable()
export class PedidosService {
  constructor(@InjectModel(Pedido.name) private pedidoModel: Model<Pedido>) {}

  async findAll(): Promise<Pedido[]> {
    return this.pedidoModel.find()
      .populate('operador')
      .populate('products')
      .exec();
  }

  async findOne(id: string): Promise<Pedido> {
    const pedido = await this.pedidoModel.findById(id)
      .populate('operador')
      .populate('products')
      .exec();
    if (!pedido) {
      throw new NotFoundException(`Pedido con id #${id} no encontrado`);
    }
    return pedido;
  }

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const newPedido = new this.pedidoModel(createPedidoDto);
    return newPedido.save();
  }

  async update(id: string, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const updatedPedido = await this.pedidoModel.findByIdAndUpdate(
      id,
      { $set: updatePedidoDto },
      { new: true }
    ).exec();
    if (!updatedPedido) {
      throw new NotFoundException(`Pedido con id #${id} no encontrado`);
    }
    return updatedPedido;
  }

  async remove(id: string): Promise<any> {
    const deletedPedido = await this.pedidoModel.findByIdAndDelete(id).exec();
    if (!deletedPedido) {
      throw new NotFoundException(`Pedido con id #${id} no encontrado`);
    }
    return { message: `Pedido con id #${id} eliminado correctamente`, deletedPedido };
  }

  async addProduct(id: string, productIds: string[]) {
    const pedido = await this.pedidoModel.findById(id);
    if (!pedido) {
      throw new NotFoundException(`Pedido con id #${id} no encontrado`);
    }

    productIds.forEach(pId => {
      if (!Types.ObjectId.isValid(pId)) {
        throw new BadRequestException(`Invalid product ID: ${pId}`);
      }
      pedido.products.push(new Types.ObjectId(pId));
    });

    return pedido.save();
  }

  async removeProduct(id: string, productId: string) {
    const pedido = await this.pedidoModel.findById(id);
    if (!pedido) {
      throw new NotFoundException(`Pedido con id #${id} no encontrado`);
    }

    if (!Types.ObjectId.isValid(productId)) {
      throw new BadRequestException(`Invalid product ID: ${productId}`);
    }
    pedido.products = pedido.products.filter(p => !p.equals(productId));
    return pedido.save();
  }
}



