import { Test, TestingModule } from '@nestjs/testing';
import { ProductosController } from './productos.controller';
import { ProductosService } from '../services/productos.service';
import { CreateProductDTO, UpdateProductDTO, FilterProductsDTO } from '../dtos/productos.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductosController', () => {
  let controller: ProductosController;
  let service: ProductosService;

  //  configuré el módulo de testing con el controlador y un mock del servicio.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosController],
      providers: [
        {
          provide: ProductosService,
          useValue: {
            // Definí los métodos mock para el servicio con jest.
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    // Obtener las instancias del controlador y del servicio desde el módulo de testing.
    controller = module.get<ProductosController>(ProductosController);
    service = module.get<ProductosService>(ProductosService);
  });

  // Verificar que el controlador esté definido.
  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  // Test para verificar que el controlador devuelve todos los productos.
  it('debería devolver todos los productos', async () => {
    const result = [{ nombre: 'Producto 1' }];
    (service.findAll as jest.Mock).mockResolvedValue(result);
    expect(await controller.findAll({} as FilterProductsDTO)).toEqual(result);
  });

  // Test para verificar que el controlador puede obtener un producto por su id.
  it('debería obtener un producto por su id', async () => {
    const result = { nombre: 'Producto 1' };
    (service.findOne as jest.Mock).mockResolvedValue(result);
    expect(await controller.getOne('1')).toEqual(result);
  });

  // Test para verificar que se lanza un error si el producto no se encuentra.
  it('debería lanzar un error si no encuentra el producto', async () => {
    (service.findOne as jest.Mock).mockRejectedValue(new NotFoundException());
    await expect(controller.getOne('1')).rejects.toThrow(NotFoundException);
  });

  // Test para verificar que el controlador puede crear un nuevo producto.
  it('debería crear un nuevo producto', async () => {
    const createProductDto: CreateProductDTO = { nombre: 'Producto 1', descripcion: 'Descripción', precio: 100, stock: 10, origen: 'Origen', imagen: 'Imagen' };
    const result = { nombre: 'Producto 1' };
    (service.create as jest.Mock).mockResolvedValue(result);
    expect(await controller.create(createProductDto)).toEqual(result);
  });

  // Test para verificar que el controlador puede actualizar un producto.
  it('debería actualizar un producto', async () => {
    const updateProductDto: UpdateProductDTO = { nombre: 'Producto 1 Actualizado' };
    const result = { nombre: 'Producto 1 Actualizado' };
    (service.update as jest.Mock).mockResolvedValue(result);
    expect(await controller.update('1', updateProductDto)).toEqual(result);
  });

  // Test para verificar que el controlador puede eliminar un producto.
  it('debería eliminar un producto', async () => {
    const result = { message: 'Producto con id #1 eliminado correctamente' };
    (service.remove as jest.Mock).mockResolvedValue(result);
    expect(await controller.delete('1')).toEqual(result);
  });
});

