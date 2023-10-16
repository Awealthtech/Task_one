import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import Joi from 'joi';

export type UserDocument = Document<user>;
@Schema({ timestamps: true })
export class user {
  Users = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    birthday: Joi.number().integer().min(1970).max(2013),
  });
  // @Prop({ required: true })
  // name: string;
  // @Prop()
  // password: string;
  // @Prop({ unique: true, required: true })
  // email: string;
  // @Prop({ unique: true, required: true })
  // phoneNumber: number;
}
export const UserSchema = SchemaFactory.createForClass(user);
