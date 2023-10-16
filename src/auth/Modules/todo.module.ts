import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from '../Controllers/todo.controller';
import { TodoService } from '../services/todo.service';

@Module({
  imports: [MongooseModule.forFeature()],
  controllers: [TodoController],
  providers: [TodoService],
})
export class todoModule {}
