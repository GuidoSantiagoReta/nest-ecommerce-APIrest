import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Operador extends Document {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  role: string;

  toJSON() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  }
}

export const OperadorSchema = SchemaFactory.createForClass(Operador);

//Definen la estructura de un operador Utilizadas para enviar datos al cliente

export interface OperadorSinPassword {
  _id: Types.ObjectId;
  email: string;
  role: string;
}


export interface OperadorConPassword {
  _id: Types.ObjectId;
  email: string;
  password: string;
  role: string;
}



