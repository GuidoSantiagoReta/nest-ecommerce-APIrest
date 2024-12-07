import { Test, TestingModule } from '@nestjs/testing';
import { ProductosService } from './productos.service';
import { getModelToken } from '@nestjs/mongoose';
import { Producto } from '../entities/producto.entity';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('ProductosService', () => {
  let service: ProductosService;
  let model: Model<Producto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductosService,
        {
          provide: getModelToken(Producto.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            create: jest.fn().mockImplementation(dto => ({
              ...dto,
              save: jest.fn().mockResolvedValue(dto),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<ProductosService>(ProductosService);
    model = module.get<Model<Producto>>(getModelToken(Producto.name));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería devolver todos los productos', async () => {
    const products = [{ nombre: 'Producto 1' }];
    jest.spyOn(model, 'find').mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce(products),
    } as any);
    expect(await service.findAll()).toEqual(products);
  });

  it('debería obtener un producto por su id', async () => {
    const product = { nombre: 'Producto 1' };
    jest.spyOn(model, 'findById').mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce(product),
    } as any);
    expect(await service.findOne('1')).toEqual(product);
  });

  it('debería lanzar un error si no encuentra el producto', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);
    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('debería crear un nuevo producto', async () => {
    const productDto = { nombre: 'Producto 1' };
    const createdProduct = await service.create(productDto as any);
    expect(createdProduct).toEqual(productDto);
  });

  it('debería actualizar un producto', async () => {
    const productDto = { nombre: 'Producto 1' };
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce(productDto),
    } as any);
    expect(await service.update('1', productDto as any)).toEqual(productDto);
  });

  it('debería lanzar un error si no encuentra el producto para actualizar', async () => {
    const productDto = { nombre: 'Producto 1' };
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);
    await expect(service.update('1', productDto as any)).rejects.toThrow(NotFoundException);
  });

  it('debería eliminar un producto', async () => {
    const result = { message: `Producto con id #1 eliminado correctamente`, deletedProduct: { nombre: 'Producto 1' } };
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(result.deletedProduct),
    } as any);
    expect(await service.remove('1')).toEqual(result);
  });

  it('debería lanzar un error si no encuentra el producto para eliminar', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);
    await expect(service.remove('1')).rejects.toThrow(NotFoundException);
  });
});
