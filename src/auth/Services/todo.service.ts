import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../Model/todo.model';
import { CreateTodoDto } from '../Dto/todo.Dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    return createdTodo.save();
  }
  async findAll(page: number, limit: number): Promise<Todo[]> {
    const skip = (page - 1) * limit;
    return this.todoModel.find().skip(skip).limit(limit).exec();
  }
}
