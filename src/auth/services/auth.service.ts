import { Injectable } from '@nestjs/common';
import { OperadoresService } from './../../operadores/services/operadores.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private operadoresService: OperadoresService) {}

  async validateUser(email: string, password: string) {
    const operador = await this.operadoresService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, operador.password);
    if (operador && isMatch) {
      return operador;
    }
    return null;
  }
}

