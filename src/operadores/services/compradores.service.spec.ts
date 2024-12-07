import { Test, TestingModule } from '@nestjs/testing';
import { CompradoresService } from './compradores.service';
import { getModelToken } from '@nestjs/mongoose';
import { Comprador } from '../entities/comprador.entity';
import { NotFoundException } from '@nestjs/common';


describe('CompradoresService', () => {
  let service: CompradoresService;
  let compradorModel: any;

  beforeEach(async () => {
    compradorModel = {
      find: jest.fn().mockReturnThis(),
      findById: jest.fn().mockReturnThis(),
      findByIdAndUpdate: jest.fn().mockReturnThis(),
      findByIdAndDelete: jest.fn().mockReturnThis(),
      exec: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompradoresService,
        {
          provide: getModelToken(Comprador.name),
          useValue: compradorModel,
        },
      ],
    }).compile();

    service = module.get<CompradoresService>(CompradoresService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería encontrar todos los compradores', async () => {
    const compradores = [{ _id: '1', name: 'Test Comprador' }];
    jest.spyOn(compradorModel, 'exec').mockResolvedValue(compradores);
    jest.spyOn(compradorModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue(compradores),
    });

    const result = await service.findAll();
    expect(result).toEqual(compradores);
  });

  it('debería encontrar un comprador por ID', async () => {
    const comprador = { _id: '1', name: 'Test Comprador' };
    jest.spyOn(compradorModel, 'exec').mockResolvedValue(comprador);
    jest.spyOn(compradorModel, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValue(comprador),
    });

    const result = await service.findOne('1');
    expect(result).toEqual(comprador);
  });

  it('debería lanzar una excepción si el comprador no se encuentra', async () => {
    jest.spyOn(compradorModel, 'exec').mockResolvedValue(null);
    jest.spyOn(compradorModel, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });


  it('debería eliminar un comprador', async () => {
    const comprador = { _id: '1', name: 'Test Comprador' };
    jest.spyOn(compradorModel, 'exec').mockResolvedValue(comprador);
    jest.spyOn(compradorModel, 'findByIdAndDelete').mockReturnValue({
      exec: jest.fn().mockResolvedValue(comprador),
    });

    const result = await service.remove('1');
    expect(result).toEqual({ message: `Comprador con id #1 eliminado correctamente`, deletedComprador: comprador });
  });
});
