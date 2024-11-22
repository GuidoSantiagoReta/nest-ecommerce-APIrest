import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosController } from './controllers/productos.controller';
import { ProductosService } from './services/productos.service';
import { Producto, ProductoSchema } from './entities/producto.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Producto.name, schema: ProductoSchema }]),
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService],  
})
export class ProductosModule {}

