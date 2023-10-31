import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../model/todo.model';
import { CreateTodoDto } from '../dto/todo.Dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto, UserID: string): Promise<Todo> {
    const createdTodo = new this.todoModel({ ...createTodoDto, UserID });
    return createdTodo.save();
  }

  async FindTodoByUser(id: string) {
    const findTodo = await this.todoModel.findById(id);
    return findTodo;
  }

  async updateTodoList(id: string) {
    const UpdateTodo = await this.todoModel.findByIdAndUpdate(id);
    return UpdateTodo;
  }

  async deleteTodoList(id: string) {
    const DeleteTodo = await this.todoModel.findByIdAndDelete(id);
    return DeleteTodo;
  }

  async getAllTodo(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    return this.todoModel.find().skip(skip).limit(pageSize).exec();
  }
}
