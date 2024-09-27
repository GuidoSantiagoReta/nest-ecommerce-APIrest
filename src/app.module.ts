import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FabricantesController } from './controllers/fabricantes/fabricantes.controller';
import { ProductosController } from './controllers/productos/productos.controller';
import { CategoriasController } from './controllers/categorias/categorias.controller';
import { CompradoresController } from './controllers/compradores/compradores.controller';
import { PedidosController } from './controllers/pedidos/pedidos.controller';
import { OperadoresController } from './controllers/operadores/operadores.controller';



@Module({
  imports: [],
  controllers: [AppController,FabricantesController, ProductosController, CategoriasController, CompradoresController, PedidosController, OperadoresController],
  providers: [AppService],
})
export class AppModule {}
