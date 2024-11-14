import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { CreateCategoriaDto } from '../dtos/categorias.dto';
import { UpdateCategoriaDto } from '../dtos/categorias.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria) private categRepo: Repository<Categoria>,
  ) {}

  // Método para encontrar todas las categorías
  findAll() {
    return this.categRepo.find();
  }

  // Método para encontrarcategoría por ID
  async findOne(id: number) {
    const category = await this.categRepo.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  // Método para crear nueva categoría
  create(data: CreateCategoriaDto) {
    const newCategory = this.categRepo.create(data);
    return this.categRepo.save(newCategory);
  }

  // Método para actualizar la categoría existente
  async update(id: number, changes: UpdateCategoriaDto) {
    const category = await this.findOne(id);
    this.categRepo.merge(category, changes);
    return this.categRepo.save(category);
  }

  // Método para eliminar categoría por ID
  async remove(id: number) {
    const category = await this.findOne(id);
    return this.categRepo.remove(category);
  }
}

