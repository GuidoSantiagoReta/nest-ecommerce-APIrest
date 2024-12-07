import { Test, TestingModule } from '@nestjs/testing';
import { CompradoresController } from './compradores.controller';
import { CompradoresService } from '../services/compradores.service';

describe('CompradoresController', () => {
  let controller: CompradoresController;
  let service: CompradoresService;

  beforeEach(async () => {
    const serviceMock = {
      findAll: jest.fn().mockResolvedValue([{ _id: '1', name: 'Test Comprador' }]),
      findOne: jest.fn().mockResolvedValue({ _id: '1', name: 'Test Comprador' }),
      create: jest.fn().mockResolvedValue({ _id: '1', name: 'Test Comprador' }),
      update: jest.fn().mockResolvedValue({ _id: '1', name: 'Updated Comprador' }),
      remove: jest.fn().mockResolvedValue({ message: 'Comprador con id #1 eliminado correctamente', deletedComprador: { _id: '1', name: 'Test Comprador' } }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompradoresController],
      providers: [
        {
          provide: CompradoresService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<CompradoresController>(CompradoresController);
    service = module.get<CompradoresService>(CompradoresService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });
});

