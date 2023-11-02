import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/model/user.model';

@Schema({ timestamps: true })
export class Todo extends mongoose.Document {
  @Prop()
  title: string;

  @Prop({ types: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: string;

  @Prop()
  description: string;
}
export const TodoSchema = SchemaFactory.createForClass(Todo);
