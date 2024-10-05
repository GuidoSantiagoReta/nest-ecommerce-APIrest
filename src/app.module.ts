import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FabricantesController } from './controllers/fabricantes/fabricantes.controller';
import { ProductosController } from './controllers/productos/productos.controller';
import { CategoriasController } from './controllers/categorias/categorias.controller';
import { CompradoresController } from './controllers/compradores/compradores.controller';
import { PedidosController } from './controllers/pedidos/pedidos.controller';
import { OperadoresController } from './controllers/operadores/operadores.controller';
import { ProductosService } from './services/productos/productos.service';
import { CategoriasService } from './services/categorias/categorias.service';
import { CompradoresService } from './services/compradores/compradores.service';
import { FabricantesService } from './services/fabricantes/fabricantes.service';
import { OperadoresService } from './services/operadores/operadores.service';
import { PedidosService } from './services/pedidos/pedidos.service';




@Module({
  imports: [],
  controllers: [AppController,FabricantesController, ProductosController, CategoriasController, CompradoresController, PedidosController, OperadoresController],
  providers: [AppService, ProductosService, CategoriasService, CompradoresService, FabricantesService, OperadoresService, PedidosService,],
})
export class AppModule {}
