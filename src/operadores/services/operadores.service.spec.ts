import { Test, TestingModule } from '@nestjs/testing';
import { OperadoresService } from './operadores.service';
import { getModelToken } from '@nestjs/mongoose';
import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/pedido.entity';
import { ProductosService } from '../../productos/services/productos.service';
import * as bcrypt from 'bcrypt';
import { CreateOperadorDTO } from '../dtos/operador.dto'; 

describe('OperadoresService', () => {
  let service: OperadoresService;
  let operadorModel: any;
  let pedidoModel: any;
  let productosService: any;

  beforeEach(async () => {
    operadorModel = {
      find: jest.fn().mockReturnThis(),
      findOne: jest.fn().mockReturnThis(),
      findById: jest.fn().mockReturnThis(),
      exec: jest.fn(),
      save: jest.fn(),
      create: jest.fn().mockImplementation((dto) => ({
        ...dto,
        _id: '1',
        toJSON: function() { return this; },
      })),
    };

    pedidoModel = {
      save: jest.fn(),
    };

    productosService = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperadoresService,
        {
          provide: getModelToken(Operador.name),
          useValue: operadorModel,
        },
        {
          provide: getModelToken(Pedido.name),
          useValue: pedidoModel,
        },
        {
          provide: ProductosService,
          useValue: productosService,
        },
      ],
    }).compile();

    service = module.get<OperadoresService>(OperadoresService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería lanzar una excepción si el operador no se encuentra', async () => {
    jest.spyOn(operadorModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });
    await expect(service.findByEmail('test@example.com')).rejects.toThrow('Operador con email test@example.com no encontrado');
  });
});
