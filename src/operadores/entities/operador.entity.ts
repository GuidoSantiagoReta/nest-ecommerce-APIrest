import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Operador extends Document {

  @Prop({ type: Types.ObjectId, auto: true })    // Define la propiedad '_id' como un ObjectId de Mongoose y genera automáticamente un nuevo ObjectId si no se proporciona
  _id: Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  role: string;
}

export const OperadorSchema = SchemaFactory.createForClass(Operador);
