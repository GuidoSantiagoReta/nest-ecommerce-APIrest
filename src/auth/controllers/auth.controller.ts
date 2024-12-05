import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './../services/auth.service';
import { Operador } from './../../operadores/entities/operador.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const operador = req.user as Operador;
    return this.authService.generateJWT(operador);  //generar el JWT y  devolverlo
  }
}


