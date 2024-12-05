import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Fabricante } from './fabricante.entity';
import { SubDoc, SubDocSchema } from './sub-doc.entity';

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

  @Prop()
  imagen: string;

  // Hacer categoria opcional
  @Prop(raw({ 
    nombre: { type: String, required: false },  
    imagen: { type: String, required: false }   
  })) 
  categoria?: Record<string, any>;

  // Relación uno a uno referencial
  @Prop({ type: Types.ObjectId, ref: Fabricante.name }) 
  fabricante?: Fabricante | Types.ObjectId;

  // Tipado de subdoc, hacer opcional
  @Prop({ type: SubDocSchema, required: false }) 
  subDoc?: SubDoc; 

  // Array de subdocumentos, hacer opcional
  @Prop({ type: [SubDocSchema], default: [] }) 
  subDocs?: Types.Array<SubDoc>;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);

// Índice compuesto de prueba
ProductoSchema.index({ precio: 1, stock: -1 });
