import { Module } from '@nestjs/common';
import { userModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { todoModule } from './todo/todo.module';
import { tokenModule } from './utils/token/token.module';

@Module({
  imports: [
    todoModule,
    userModule,
    tokenModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
})
export class AppModule {}
