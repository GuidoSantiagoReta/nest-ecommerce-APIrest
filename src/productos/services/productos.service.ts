//El servicio contiene toda la lógica de negocio

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './../entities/producto.entity';
import { CreateProductDTO, UpdateProductDTO } from './../dtos/productos.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productRepo: Repository<Producto>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    return this.productRepo.findOneBy({ id }).then((product) => {
      if (!product) {
        throw new NotFoundException(`El producto con id: #${id} no existe`);
      }
      return product;
    });
  }

  create(data: CreateProductDTO) {
    const newProduct = this.productRepo.create(data);
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDTO) {
    const product = await this.productRepo.findOneBy({ id });
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id).then((result) => {
      if (result.affected === 0) {
        throw new NotFoundException(`El producto con id: #${id} no existe`);
      }
      return { message: `Producto con id #${id} eliminado correctamente` };
    });
  }
}