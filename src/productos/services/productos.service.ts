//El servicio contiene toda la lógica de negocio

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './../entities/producto.entity';
import { CreateProductDTO, UpdateProductDTO } from './../dtos/productos.dto';
import { FabricantesService } from './fabricantes.service';
import { Categoria } from '../entities/categoria.entity';
import { umask } from 'process';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto) private productRepo: Repository<Producto>,
    @InjectRepository(Categoria) private categoriaRepo: Repository<Categoria>,
    private fabricantesService: FabricantesService,
  ) {}

  findAll() {
    return this.productRepo.find({ relations: ['fabricante', 'categorias'] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['fabricante', 'categorias'],
    });
    if (!product) {
      throw new NotFoundException(`El producto con id: #${id} no existe`);
    }
    return product;
  }

  async create(data: CreateProductDTO) {
    const newProduct = this.productRepo.create(data);
  
    if (data.fabricanteId) {
      const fabricante = await this.fabricantesService.findOne(data.fabricanteId);
      if (!fabricante) {
        throw new NotFoundException(`El fabricante #${data.fabricanteId} no existe`);
      }
      newProduct.fabricante = fabricante;
    }
  
    if (data.categoriasIds) {
      const categorias = await this.categoriaRepo.findByIds(data.categoriasIds);
      if (categorias.length !== data.categoriasIds.length) {
        throw new NotFoundException(`Alguna de las categorías no existe`);
      }
      newProduct.categorias = categorias;
    }
  
    return this.productRepo.save(newProduct);
  }
  
  async update(id: number, changes: UpdateProductDTO) {
    const product = await this.findOne(id);
    if (changes.categoriasIds) {
      const categorias = await this.categoriaRepo.findByIds(changes.categoriasIds);
      product.categorias = categorias;
    }
    if (changes.fabricanteId) {
      const fabricante = await this.fabricantesService.findOne(changes.fabricanteId);
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

  async addCategoryToProduct(productId: number, categoryId: number){
    const producto = await this.productRepo.findOne(productId, {
      relations: ['categorias'],
    });
    const category = await this.categoriaRepo.findOne(categoryId);
    producto.categorias.push(category);
    return this.productRepo.save(producto);
  }

  async removeCategoryByProduct(productoId: number, categoryId: number) {
  const producto = await this.productRepo.findOne(productoId, {
    relations: ['categorias'],
  });
  producto.categorias = producto.categorias.filter(
    (item) => item.id !== categoryId,
  );
  return this.productRepo.save(producto)
  }

}

