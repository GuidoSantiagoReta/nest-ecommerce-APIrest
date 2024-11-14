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
import { Pedido } from './entities/pedido.entity';
import { DetallePedido } from './entities/detallePedido.entity';

import { DetallePedidoController } from './controllers/detalle-pedido.controller'; 
import { DetallePedidoService } from './services/detalle-pedido.service';


@Module({
  imports: [
    ProductosModule,
    TypeOrmModule.forFeature([Operador, Comprador, Pedido, DetallePedido]),
  ],
  controllers: [
    PedidosController, 
    OperadoresController, 
    CompradoresController,
    DetallePedidoController

  ],
  providers: [
    PedidosService, 
    OperadoresService, 
    CompradoresService,
    DetallePedidoService
  ],
  exports: [PedidosService, OperadoresService, CompradoresService, DetallePedidoService],
})
export class OperadoresModule {}
