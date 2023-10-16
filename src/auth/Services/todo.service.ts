import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../schema/todo.schema';
import { CreateTodoDto } from '../Dto/CreateTodo.Dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    return createdTodo.save();
  }
}
