import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comprador } from '../entities/comprador.entity';
import { CreateCompradorDto, UpdateCompradorDto } from '../dtos/comprador.dto';

@Injectable()
export class CompradoresService {
  constructor(@InjectModel(Comprador.name) private compradorModel: Model<Comprador>) {}

  async findAll(): Promise<Comprador[]> {
    return this.compradorModel.find().exec();
  }

  async findOne(id: string): Promise<Comprador> {
    const comprador = await this.compradorModel.findById(id).exec();
    if (!comprador) {
      throw new NotFoundException(`Comprador con id #${id} no encontrado`);
    }
    return comprador;
  }

  async create(createCompradorDto: CreateCompradorDto): Promise<Comprador> {
    const newComprador = new this.compradorModel(createCompradorDto);
    return newComprador.save();
  }

  async update(id: string, updateCompradorDto: UpdateCompradorDto): Promise<Comprador> {
    const updatedComprador = await this.compradorModel.findByIdAndUpdate(
      id,
      { $set: updateCompradorDto },
      { new: true }
    ).exec();
    if (!updatedComprador) {
      throw new NotFoundException(`Comprador con id #${id} no encontrado`);
    }
    return updatedComprador;
  }

  async remove(id: string): Promise<any> {
    const deletedComprador = await this.compradorModel.findByIdAndDelete(id).exec();
    if (!deletedComprador) {
      throw new NotFoundException(`Comprador con id #${id} no encontrado`);
    }
    return { message: `Comprador con id #${id} eliminado correctamente`, deletedComprador };
  }
}


