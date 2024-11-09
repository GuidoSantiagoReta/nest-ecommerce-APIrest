import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fabricante } from '../entities/fabricante.entity';
import {
  CreateFabricanteDto,
  UpdateFabricanteDto,
} from '../dtos/fabricantes.dto';

@Injectable()
export class FabricantesService {
  constructor(
    @InjectRepository(Fabricante) private fabricanteRepo: Repository<Fabricante>,
  ) {}

  findAll() { 
    return this.fabricanteRepo.find({ relations: ['productos'] }); 
}

  async findOne(id: number) {
    const fabricante = await this.fabricanteRepo.findOne(id);
    if (!fabricante) {
      throw new NotFoundException(`El fabricante #${id} no existe`);
    }
    return fabricante;
  }

  create(data: CreateFabricanteDto) {
    const newFabricante = this.fabricanteRepo.create(data);
    return this.fabricanteRepo.save(newFabricante);
  }

  async update(id: number, changes: UpdateFabricanteDto) {
    const fabricante = await this.findOne(id);
    this.fabricanteRepo.merge(fabricante, changes);
    return this.fabricanteRepo.save(fabricante);
  }

  async remove(id: number) {
    const fabricante = await this.findOne(id);
    return this.fabricanteRepo.remove(fabricante);
  }
}

