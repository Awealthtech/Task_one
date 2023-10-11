import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document<user>;
@Schema({ timestamps: true })
export class user {
  @Prop({ required: true })
  name: string;
  @Prop()
  password: string;
  @Prop({ unique: true, required: true })
  email: string;
}
export const UserSchema = SchemaFactory.createForClass(user);
