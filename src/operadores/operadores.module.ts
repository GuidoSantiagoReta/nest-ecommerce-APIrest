import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OperadoresController } from './controllers/operadores.controller';
import { OperadoresService } from './services/operadores.service';
import { Operador } from './entities/operador.entity';

import { CompradoresController } from './controllers/compradores.controller';
import { CompradoresService } from './services/compradores.service';
import { Comprador } from './entities/comprador.entity';

import { PedidosController } from './controllers/pedidos.controller';
import { PedidosService } from './services/pedidos.service';

import { ProductosModule } from '../productos/productos.module';



@Module({
  imports: [
    ProductosModule,
    TypeOrmModule.forFeature([Operador, Comprador  /*agregar pedido al definir relaciones*/])
  ],
  controllers: [
    PedidosController, 
    OperadoresController, 
    CompradoresController,
  ],
  providers: [
    PedidosService, 
    OperadoresService, 
    CompradoresService,
  ],
  exports: [PedidosService, OperadoresService, CompradoresService],
})
export class OperadoresModule {}
