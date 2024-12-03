import { Injectable, NotFoundException } from '@nestjs/common';
import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/pedido.entity';
import { ProductosService } from './../../productos/services/productos.service';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOperadorDTO } from '../dtos/operador.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OperadoresService {
  constructor(
    @InjectModel(Operador.name) private operadorModel: Model<Operador>,
    @InjectModel(Pedido.name) private pedidoModel: Model<Pedido>,
    private readonly productsService: ProductosService,
  ) {}

  async findAll(): Promise<Operador[]> {
    return this.operadorModel.find().exec();
  }

  async create(data: CreateOperadorDTO) {
    const newModel = new this.operadorModel(data);
    const hashPassword = await bcrypt.hash(newModel.password, 10);
    newModel.password = hashPassword;
    const model = await newModel.save();
    const { password, ...rta } = model.toJSON();
    return rta;
  }

  findByEmail(email: string) {
    return this.operadorModel.findOne({ email }).exec();
  }

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

  // Método para hashear una contraseña y actualizar un operador
  async hashPasswordAndSave(email: string, plainPassword: string) {
    const operador = await this.findByEmail(email);
    if (!operador) {
      throw new NotFoundException(`Operador con email ${email} no encontrado`);
    }
    operador.password = await bcrypt.hash(plainPassword, 10);
    await operador.save();
    console.log(`Password para ${email} ha sido actualizada.`);
    return operador;
  }
}




