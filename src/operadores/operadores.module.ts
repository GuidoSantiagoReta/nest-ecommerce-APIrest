import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompradoresController } from './controllers/compradores.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';
import { ProductosModule } from '../productos/productos.module';
import { Operador, OperadorSchema } from './entities/operador.entity';
import { Pedido, PedidoSchema } from './entities/pedido.entity';
import { Comprador, CompradorSchema } from './entities/comprador.entity'; 

@Module({
  imports: [
    ProductosModule,
    MongooseModule.forFeature([
      { name: Operador.name, schema: OperadorSchema },
      { name: Pedido.name, schema: PedidoSchema },
      { name: Comprador.name, schema: CompradorSchema }, 
    ]),
  ],
  controllers: [
    CompradoresController,
    OperadoresController,
    PedidosController,
  ],
  providers: [
    PedidosService,
    OperadoresService,
    CompradoresService,
  ],
})

export class OperadoresModule {}



