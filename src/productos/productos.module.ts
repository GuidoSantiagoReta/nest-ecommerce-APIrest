import { Module } from '@nestjs/common';
import { FabricantesController } from './controllers/fabricantes.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { ProductosController } from './controllers/productos.controller';
import { CategoriasService } from './services/categorias.service';
import { FabricantesService } from './services/fabricantes.service';
import { ProductosService } from './services/productos.service';

@Module({  controllers: [
    ProductosController,
   
    CategoriasController,
    FabricantesController,
  ],
  providers: [
  
    ProductosService,
    CategoriasService,
    FabricantesService,
  
  
  ],
  exports: [ProductosService],
})
export class ProductosModule {}
