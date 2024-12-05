import { Injectable, NotFoundException } from '@nestjs/common';
import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/pedido.entity';
import { ProductosService } from './../../productos/services/productos.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOperadorDTO } from '../dtos/operador.dto';
import * as bcrypt from 'bcrypt';
import { OperadorSinPassword, OperadorConPassword } from '../entities/operador.entity';

@Injectable()
export class OperadoresService {
  constructor(
    @InjectModel(Operador.name) private operadorModel: Model<Operador>,
    @InjectModel(Pedido.name) private pedidoModel: Model<Pedido>,
    private readonly productsService: ProductosService,
  ) {}

  async findAll(): Promise<OperadorSinPassword[]> {
    const operadores = await this.operadorModel.find().exec();
    return operadores.map(operador => {
      const { password, ...result } = operador.toJSON();
      return result;
    });
  }

  async create(data: CreateOperadorDTO): Promise<OperadorSinPassword> {
    const newModel = new this.operadorModel(data);
    const hashPassword = await bcrypt.hash(newModel.password, 10);
    newModel.password = hashPassword;
    const model = await newModel.save();
    const { password, ...rta } = model.toJSON();
    return rta as OperadorSinPassword;
  }

  async findByEmail(email: string): Promise<OperadorConPassword | null> {
    const operador = await this.operadorModel.findOne({ email }).exec();
    if (!operador) {
      throw new NotFoundException(`Operador con email ${email} no encontrado`);
    }
    return operador.toJSON() as OperadorConPassword;
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
  
  // Método para hashear una nueva contraseña y actualizar el operador correspondiente.
  async hashPasswordAndSave(email: string, plainPassword: string): Promise<OperadorSinPassword> {
    const operador = await this.operadorModel.findOne({ email }).exec();
    if (!operador) {
      throw new NotFoundException(`Operador con email ${email} no encontrado`);
    }
    operador.password = await bcrypt.hash(plainPassword, 10);
    await operador.save();
    const operadorObj = operador.toObject();
    delete operadorObj.password;
    return operadorObj as OperadorSinPassword;
  }
}






