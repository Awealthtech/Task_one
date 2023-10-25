import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

// export type UserDocument = Document<User>;
@Schema({ timestamps: true })
export class User extends mongoose.Document {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
