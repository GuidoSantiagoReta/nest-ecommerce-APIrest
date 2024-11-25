import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SubDoc extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const SubDocSchema = SchemaFactory.createForClass(SubDoc);
