import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { OperadoresModule } from '../operadores/operadores.module';
import { AuthController } from './controllers/auth.controller'

@Module({
  imports: [OperadoresModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

