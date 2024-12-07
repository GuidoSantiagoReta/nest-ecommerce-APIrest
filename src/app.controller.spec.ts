import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Reflector } from '@nestjs/core';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        Reflector,
        {
          provide: ApiKeyGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
        {
          provide: 'CONFIGURATION(config)',
          useValue: jest.fn().mockImplementation(() => ({
            apiKey: 'testApiKey',
          })),
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('debería estar definido', () => {
    expect(appController).toBeDefined();
  });

  it('debería retornar un nuevo mensaje', () => {
    jest.spyOn(appService, 'getNewMessage').mockReturnValue('Nuevo mensaje');
    expect(appController.newEndpoint()).toBe('Nuevo mensaje');
  });

  it('debería retornar "Sigo OK con /"', () => {
    expect(appController.getEstoyOK()).toBe('Sigo OK con /');
  });

  it('debería retornar "ruta pública"', () => {
    expect(appController.publicEndpoint()).toBe('ruta pública');
  });

  it('debería retornar "Metodo para probar guardian"', () => {
    expect(appController.getNuevo()).toBe('Metodo para probar guardian');
  });
});

