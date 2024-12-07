import { Test, TestingModule } from '@nestjs/testing';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from '../services/pedidos.service';

describe('PedidosController', () => {
  let controller: PedidosController;
  let service: PedidosService;

  beforeEach(async () => {
    const serviceMock = {
      findAll: jest.fn().mockResolvedValue([{ _id: '1', name: 'Test Pedido' }]),
      findOne: jest.fn().mockResolvedValue({ _id: '1', name: 'Test Pedido' }),
      create: jest.fn().mockResolvedValue({ _id: '1', name: 'Test Pedido' }),
      update: jest.fn().mockResolvedValue({ _id: '1', name: 'Updated Pedido' }),
      remove: jest.fn().mockResolvedValue({ message: 'Pedido con id #1 eliminado correctamente', deletedPedido: { _id: '1', name: 'Test Pedido' } }),
      addProduct: jest.fn().mockResolvedValue({ _id: '1', name: 'Test Pedido', products: ['product1', 'product2'] }),
      removeProduct: jest.fn().mockResolvedValue({ _id: '1', name: 'Test Pedido', products: ['product2'] }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosController],
      providers: [
        {
          provide: PedidosService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<PedidosController>(PedidosController);
    service = module.get<PedidosService>(PedidosService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });
});
