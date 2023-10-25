import { Module } from '@nestjs/common';
import { userModule } from './auth/Modules/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { todoModule } from './auth/Modules/todo.module';

@Module({
  imports: [
    todoModule,
    userModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
})
export class AppModule {}
