import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class Todo {
  @Prop()
  title: string;

  @Prop({ types: mongoose.Schema.Types.ObjectId, ref: 'users' })
  User: string;

  @Prop()
  description: string;
}
export const TodoSchema = SchemaFactory.createForClass(Todo);
