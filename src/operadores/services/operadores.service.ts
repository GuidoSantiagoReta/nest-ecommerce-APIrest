import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/pedido.entity';
import { ProductosService } from './../../productos/services/productos.service';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';
import { Client } from 'pg';

@Injectable()
export class OperadoresService {
  private operadores: Operador[] = [
    { id: 1, email: 'operador1@mail.com', password: '12345', role: 'admin' },
    { id: 2, email: 'operador2@mail.com', password: '12345', role: 'user' },
  ];

  constructor(
    private productsService: ProductosService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client
  ) {
    const dbName = this.configService.get<string>('config.database.name');
    const apiKey = this.configService.get<string>('config.apiKey');
    console.log('DATABASE_NAME:', dbName);
    console.log('API_KEY:', apiKey);
  }

  async getOrderByUser(id: number) {
    const user = this.findOne(id);       // findOneBy({ id })
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
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

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tareas', (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  }
}