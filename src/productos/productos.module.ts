import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FabricantesController } from './controllers/fabricantes.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { ProductosController } from './controllers/productos.controller';
import { CategoriasService } from './services/categorias.service';
import { FabricantesService } from './services/fabricantes.service';
import { ProductosService } from './services/productos.service';
import { Producto } from './entities/producto.entity';
import { Fabricante } from './entities/fabricante.entity';
import { Categoria } from './entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Fabricante, Categoria])],
  controllers: [
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

//seguir solo implemente en typeorm en entidad producto y  productos.module