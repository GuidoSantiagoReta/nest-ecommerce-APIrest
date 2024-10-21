import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/pedido.entity';
import { ProductosService } from './../../productos/services/productos.service';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';

@Injectable()
export class OperadoresService {
  private operadores: Operador[] = [
    { id: 1, email: 'operador1@mail.com', password: '12345', role: 'admin' },
    { id: 2, email: 'operador2@mail.com', password: '12345', role: 'user' },
  ];

  constructor(
    private productsService: ProductosService,
    private configService: ConfigService,
    
  ) {
    const dbName = this.configService.get<string>('config.database.name');
    const apiKey = this.configService.get<string>('config.apiKey');
    console.log('DATABASE_NAME:', dbName);
    console.log('API_KEY:', apiKey);
  }

  getOrderByUser(id: number): Pedido {
    const operador = this.findOne(id);
    if (!operador) {
      throw new NotFoundException(`Operador con ID #${id} no encontrado`);
    }
    return {
      date: new Date(),
      operador,
      products: this.productsService.findAll(),
    };
  }

  findOne(id: number): Operador {
    return this.operadores.find(op => op.id === id) || null;
  }

  findAll() {
    const apiKey = this.configService.get<string>('config.apiKey');
    const dbName = this.configService.get<string>('config.database.name');
    console.log(apiKey, dbName);
    return this.operadores;
  }
}
