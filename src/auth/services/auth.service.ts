import { Injectable } from '@nestjs/common';
import { OperadoresService } from './../../operadores/services/operadores.service';
import * as bcrypt from 'bcrypt';
import { OperadorConPassword, Operador } from './../../operadores/entities/operador.entity';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from './../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private operadoresService: OperadoresService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const operador = await this.operadoresService.findByEmail(email) as OperadorConPassword;
    if (!operador) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, operador.password);
    if (operador && isMatch) {
      const { password, ...result } = operador;
      return result;
    }
    return null;
  }

  generateJWT(operador: Operador) {
    const payload: PayloadToken = {
      role: operador.role,
      sub: operador._id.toString(), // Convertir ObjectId a string
    };
    return { access_token: this.jwtService.sign(payload), operador };
  }
}

