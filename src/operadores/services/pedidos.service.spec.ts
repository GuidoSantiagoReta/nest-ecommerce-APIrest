import { Test, TestingModule } from '@nestjs/testing';
import { PedidosService } from './pedidos.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Pedido } from '../entities/pedido.entity';

describe('PedidosService', () => {
  let service: PedidosService;
  let model: Model<Pedido & Document>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidosService,
        {
          provide: getModelToken(Pedido.name),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn().mockReturnThis(),
            findById: jest.fn().mockReturnThis(),
            findByIdAndUpdate: jest.fn().mockReturnThis(),
            findByIdAndDelete: jest.fn().mockReturnThis(),
            exec: jest.fn(),
            save: jest.fn(),
            populate: jest.fn().mockReturnThis(),
          },
        },
      ],
    }).compile();

    service = module.get<PedidosService>(PedidosService);
    model = module.get<Model<Pedido & Document>>(getModelToken(Pedido.name));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería encontrar todos los pedidos', async () => {
    const result = [{ _id: '1', name: 'Test Pedido' }];
    jest.spyOn(model, 'find').mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(result),
    } as any);
    expect(await service.findAll()).toEqual(result);
  });

  it('debería encontrar un pedido por ID', async () => {
    const result = { _id: '1', name: 'Test Pedido' };
    jest.spyOn(model, 'findById').mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(result),
    } as any);
    expect(await service.findOne('1')).toEqual(result);
  });

  it('debería lanzar una excepción si el pedido no se encuentra', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(null),
    } as any);
    await expect(service.findOne('1')).rejects.toThrow('Pedido con id #1 no encontrado');
  });

  it('debería crear un nuevo pedido', async () => {
    const createPedidoDto = { name: 'New Pedido' };
    const result = { _id: '1', name: 'New Pedido' };
    const newPedidoInstance = {
      save: jest.fn().mockResolvedValue(result),
    };
  });

  it('debería actualizar un pedido', async () => {
    const updatePedidoDto = { name: 'Updated Pedido' };
    const result = { _id: '1', name: 'Updated Pedido' };
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValue(result),
    } as any);
    expect(await service.update('1', updatePedidoDto as any)).toEqual(result);
  });

  it('debería eliminar un pedido', async () => {
    const result = { _id: '1', name: 'Test Pedido' };
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
      exec: jest.fn().mockResolvedValue(result),
    } as any);
    expect(await service.remove('1')).toEqual({ message: `Pedido con id #1 eliminado correctamente`, deletedPedido: result });
  });
});

