import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comprador } from '../entities/comprador.entity';
import { CreateCompradorDto, UpdateCompradorDto } from '../dtos/comprador.dto';

@Injectable()
export class CompradoresService {
  constructor(
    @InjectRepository(Comprador) private compradorRepo: Repository<Comprador>,
  ) {}

  async findAll() {
    return await this.compradorRepo.find();
  }

  async findOne(id: number) {
    const comprador = await this.compradorRepo.findOne({ where: { id } });
    if (!comprador) {
      throw new NotFoundException(`Comprador #${id} no encontrado`);
    }
    return comprador;
  }

  create(data: CreateCompradorDto) {
    const nuevoComprador = this.compradorRepo.create(data);
    return this.compradorRepo.save(nuevoComprador);
  }

  async update(id: number, changes: UpdateCompradorDto) {
    const comprador = await this.findOne(id);
    this.compradorRepo.merge(comprador, changes);
    return this.compradorRepo.save(comprador);
  }

  remove(id: number) {
    return this.compradorRepo.delete(id);
  }
}
