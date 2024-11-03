import { Injectable, Inject, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/pedido.entity';
import { ProductosService } from './../../productos/services/productos.service';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';
import { Client } from 'pg';
import { CompradoresService } from './compradores.service';

@Injectable()
export class OperadoresService {
  constructor(
    private productsService: ProductosService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(Operador) private operadorRepo: Repository<Operador>,
    private compradorService: CompradoresService,
  ) {}

   findAll() {
    return this.operadorRepo.find({
      relations: ['comprador']
    });
  }

  async findOne(id: number) {
    const operador = await this.operadorRepo.findOne({ 
      where: { id }, 
      relations: ['comprador'],
     });
    if (!operador) {
      throw new NotFoundException(`Operador #${id} no encontrado`);
    }
    return operador;
  }
  

  async create(data: CreateOperadorDTO) {
    try {
      const newOperador = this.operadorRepo.create(data);
      if (data.compradorId) {
        const comprador = await this.compradorService.findOne(data.compradorId);
        newOperador.comprador = comprador;
      }
      return await this.operadorRepo.save(newOperador);
    } catch (error) {
      if (error.code === '23505') {  // Código de error de clave única duplicada
        throw new ConflictException('Operador ya existe con este email');
      } else {
        throw new InternalServerErrorException('Error al crear el operador');
      }
    }
  }

  async update(id: number, changes: UpdateOperadorDTO) {
    const operador = await this.findOne(id);
    if (changes.compradorId){
      const nuevoComprador = await this.compradorService.findOne(
        changes.compradorId,
      );
      operador.comprador = nuevoComprador;
    }
    const updOperad =this.operadorRepo.merge(operador, changes);
    return this.operadorRepo.save(updOperad);
  }

  remove(id: number) {
    return this.operadorRepo.delete(id);
  }

  async getOrderByUser(id: number): Promise<Pedido> {
    const operador = await this.operadorRepo.findOne({ where: { id } });
    return {
      date: new Date(),
      operador,
      products: await this.productsService.findAll(),
    };
  }

  getTasks() {
    // solo a modo de ejemplo, no es buena práctica reutilizar métodos
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tareas', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}