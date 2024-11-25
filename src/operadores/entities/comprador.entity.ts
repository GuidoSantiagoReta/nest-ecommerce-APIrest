import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Comprador extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    type: [
      {
        calle: { type: String, required: true },
        numero: { type: String, required: true },
        ciudad: { type: String, required: true },
      },
    ],
    
  })
  direcciones: Types.Array<Record<string, any>>;
}

export const CompradorSchema = SchemaFactory.createForClass(Comprador);

