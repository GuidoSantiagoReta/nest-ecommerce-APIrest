//El servicio contiene toda la lógica de negocio
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './../entities/producto.entity';
import { CreateProductDTO, UpdateProductDTO } from './../dtos/productos.dto';
import { FabricantesService } from './fabricantes.service';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto) private productRepo: Repository<Producto>,
    private fabricantesService: FabricantesService,
  ) {}
  findAll() {
    return this.productRepo.find();
  }
  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['fabricante'],
    });
    if (!product) {
      throw new NotFoundException(`El producto con id: #${id} no existe`);
    }
    return product;
  }
  async create(data: CreateProductDTO) {
    const newProduct = this.productRepo.create(data);
    if (data.fabricanteId) {
      const fabricante = await this.fabricantesService.findOne(
        data.fabricanteId,
      );
      newProduct.fabricante = fabricante;
    }
    return this.productRepo.save(newProduct);
  }
  async update(id: number, changes: UpdateProductDTO) {
    const product = await this.findOne(id);
    if (changes.fabricanteId) {
      const fabricante = await this.fabricantesService.findOne(
        changes.fabricanteId,
      );
      product.fabricante = fabricante;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }
  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`El producto con id: #${id} no existe`);
    }
    return this.productRepo.remove(product);
  }
}
