import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from '../todo/controller/todo.controller';
import { TodoService } from './service/todo.service';
import { TodoSchema } from '../todo/model/todo.model';
import { TokenService } from 'src/utils/token/services/token.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [TodoService, TokenService],
})
export class todoModule {}
