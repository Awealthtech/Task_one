import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from '../Controllers/todo.controller';
import { TodoService } from '../services/todo.service';
import { TodoSchema } from '../Model/todo.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class todoModule {}
