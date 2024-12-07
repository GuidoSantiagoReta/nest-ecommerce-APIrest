import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { OperadoresService } from './../../operadores/services/operadores.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt'); // Mock de bcrypt

describe('AuthService', () => {
  let service: AuthService;
  let operadoresService: OperadoresService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: OperadoresService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    operadoresService = module.get<OperadoresService>(OperadoresService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería validar usuario y retornar datos sin contraseña', async () => {
    const mockOperador = {
      _id: '1',
      email: 'test@example.com',
      password: 'hashedPassword',
      role: 'admin',
    };
    (operadoresService.findByEmail as jest.Mock).mockResolvedValue(mockOperador);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await service.validateUser('test@example.com', 'password');
    expect(result).toEqual({ _id: '1', email: 'test@example.com', role: 'admin' });
  });

  it('debería retornar null si no se encuentra el usuario', async () => {
    (operadoresService.findByEmail as jest.Mock).mockResolvedValue(null);
    const result = await service.validateUser('test@example.com', 'password');
    expect(result).toBeNull();
  });

  it('debería generar JWT', () => {
    const mockOperador = {
      _id: '1',
      email: 'test@example.com',
      role: 'admin',
    };
    const mockToken = 'jwtToken';
    (jwtService.sign as jest.Mock).mockReturnValue(mockToken);
    const result = service.generateJWT(mockOperador as any);
    expect(result).toEqual({ access_token: mockToken, operador: mockOperador });
  });
});

