import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Todo extends mongoose.Document {
  @Prop()
  title: string;

  @Prop({ types: mongoose.Schema.Types.ObjectId, ref: 'users' })
  userID: string;

  @Prop()
  description: string;
}
export const TodoSchema = SchemaFactory.createForClass(Todo);
