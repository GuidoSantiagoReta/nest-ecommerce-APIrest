import { Injectable } from '@nestjs/common';
import { OperadoresService } from './../../operadores/services/operadores.service';
import * as bcrypt from 'bcrypt';
import { OperadorConPassword } from './../../operadores/entities/operador.entity';

@Injectable()
export class AuthService {
  constructor(private operadoresService: OperadoresService) {}

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
}

