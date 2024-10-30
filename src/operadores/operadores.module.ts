import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompradoresController } from './controllers/compradores.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';
import { ProductosModule } from '../productos/productos.module';
import { Comprador } from './entities/comprador.entity';
import { Operador } from './entities/operador.entity';

@Module({
  imports: [
    ProductosModule,
    TypeOrmModule.forFeature([Comprador, Operador /*agregar pedido al definir relaciones*/])
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
