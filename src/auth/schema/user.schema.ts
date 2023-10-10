import { Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class user {
  @Prop({ required: true })
  name: string;
  @Prop()
  password: string;
}
