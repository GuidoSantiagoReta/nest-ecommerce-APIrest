import { Injectable, NotFoundException } from '@nestjs/common';
import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/pedido.entity';
import { ProductosService } from './../../productos/services/productos.service';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';

@Injectable()
export class OperadoresService {
  constructor(private productsService: ProductosService) {} 

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
    
    return {
      id,
      email: `correo${id}@mail.com`,
      password: '12345',
      role: 'admin',
    };
  }
}
