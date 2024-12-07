import { Test, TestingModule } from '@nestjs/testing';
import { OperadoresController } from './operadores.controller';
import { OperadoresService } from '../services/operadores.service';
import { Response } from 'express';
import { CreateOperadorDTO } from '../dtos/operador.dto';

describe('OperadoresController', () => {
  let controller: OperadoresController;
  let service: OperadoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperadoresController],
      providers: [
        {
          provide: OperadoresService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            getOrderByUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OperadoresController>(OperadoresController);
    service = module.get<OperadoresService>(OperadoresService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería devolver todos los operadores', async () => {
    const result = [{ nombre: 'Operador 1' }];
    (service.findAll as jest.Mock).mockResolvedValue(result);

    const res = { json: jest.fn() } as any as Response;
    await controller.findAll(res);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('debería crear un nuevo operador', async () => {
    const createOperadorDto: CreateOperadorDTO = {
      
      email: 'test@example.com',
      password: '123456',
      role:'Admin'
    };
    const result = { nombre: 'Operador 1', descripcion: 'Descripción' };
    (service.create as jest.Mock).mockResolvedValue(result);
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any as Response;
    await controller.create(createOperadorDto, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('debería obtener pedidos por id de operador', async () => {
    const result = [{ id: '1', producto: 'Producto 1' }];
    (service.getOrderByUser as jest.Mock).mockResolvedValue(result);

    const res = { json: jest.fn() } as any as Response;
    await controller.getOrders('1', res);
    expect(res.json).toHaveBeenCalledWith(result);
  });
});
