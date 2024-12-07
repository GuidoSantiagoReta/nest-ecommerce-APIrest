import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './../services/auth.service';
import { Request } from 'express';
import { Operador } from './../../operadores/entities/operador.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            generateJWT: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería hacer login y generar un JWT', () => {
    const req = {
      user: {
        _id: '1',
        email: 'test@example.com',
        role: 'admin',
      },
    } as unknown as Request;

    const mockToken = { access_token: 'jwtToken' };
    (authService.generateJWT as jest.Mock).mockReturnValue(mockToken);

    const result = controller.login(req);
    expect(result).toEqual(mockToken);
    expect(authService.generateJWT).toHaveBeenCalledWith(req.user);
  });
});

