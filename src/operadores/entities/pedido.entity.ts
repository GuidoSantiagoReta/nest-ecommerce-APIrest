import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Producto } from '../../productos/entities/producto.entity';

@Schema()
export class Pedido extends Document {
  @Prop()
  date: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: Producto.name }] })
  products: Producto[];

  @Prop({ type: Types.ObjectId, ref: 'Operador' })  
  operador: Types.ObjectId;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);

