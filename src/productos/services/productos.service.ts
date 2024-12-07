//El servicio contiene toda la lógica de negocio
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from '../entities/producto.entity';
import { CreateProductDTO, UpdateProductDTO, FilterProductsDTO } from '../dtos/productos.dto';

@Injectable()
export class ProductosService {
  constructor(@InjectModel(Producto.name) private productoModel: Model<Producto>) {}

  async findAll(params?: FilterProductsDTO): Promise<Producto[]> {
    const { limit, offset, precioMinimo, precioMaximo } = params || {};
    const filters: any = {};

    if (precioMinimo !== undefined && precioMaximo !== undefined) {
      filters.precio = { $gte: precioMinimo, $lte: precioMaximo };
    } else if (precioMinimo !== undefined) {
      filters.precio = { $gte: precioMinimo };
    } else if (precioMaximo !== undefined) {
      filters.precio = { $lte: precioMaximo };
    }

    return this.productoModel
      .find(filters)
      .populate('fabricante')
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Producto> {
    const product = await this.productoModel
      .findById(id)
      .populate('fabricante')
      .exec();
    if (!product) {
      throw new NotFoundException(`Producto con id #${id} no encontrado`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDTO): Promise<Producto> {
    const createdProduct = await this.productoModel.create(createProductDto);
    return createdProduct.save();
  }

  async update(id: string, updateProductDto: UpdateProductDTO): Promise<Producto> {
    const updatedProduct = await this.productoModel
      .findByIdAndUpdate(id, { $set: updateProductDto }, { new: true })
      .populate('fabricante')
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Producto con id #${id} no encontrado`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<any> {
    const deletedProduct = await this.productoModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Producto con id #${id} no encontrado`);
    }
    return { message: `Producto con id #${id} eliminado correctamente`, deletedProduct };
  }
}



