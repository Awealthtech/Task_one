import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document<User>;
@Schema({ timestamps: true })
export class User {
  // @Prop()
  name: string;
  // @Prop()
  password: string;
  @Prop({ unique: [true, 'Duplicate email'] })
  email: string;

  // @Prop()
  phoneNumber: number;
}
export const UserSchema = SchemaFactory.createForClass(User);
