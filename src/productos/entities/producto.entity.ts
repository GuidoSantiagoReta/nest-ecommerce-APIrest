import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Fabricante, FabricanteSchema } from './fabricante.entity';
import { Categoria, CategoriaSchema } from './categorias.entity';

@Schema()
export class Producto extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ type: Number, index: true })
  precio: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  origen: string;

  //relacion uno a uno categoria embebida
  @Prop()
  imagen: string;
  @Prop(raw({ 
    nombre: { type: String, required: true }, 
    imagen: { type: String } 
  })) 
  categoria: Record<string, any>;

  //relacion uno a uno referencial
  @Prop({ type: Types.ObjectId, ref: Fabricante.name }) 
   fabricante: Fabricante | Types.ObjectId;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);

// índice compuesto de prueba
ProductoSchema.index({ precio: 1, stock: -1 });
