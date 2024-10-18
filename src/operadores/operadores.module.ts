import { Module } from '@nestjs/common';
import { CompradoresController } from './controllers/compradores.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';
import { ProductosModule } from '../productos/productos.module';


@Module({
  imports: [ProductosModule], 
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
})
export class OperadoresModule {}
