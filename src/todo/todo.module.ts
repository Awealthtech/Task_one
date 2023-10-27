import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from '../todo/controller/todo.controller';
import { TodoService } from './service/todo.service';
import { TodoSchema } from '../todo/model/todo.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class todoModule {}
