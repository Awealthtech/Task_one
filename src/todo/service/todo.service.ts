import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../model/todo.model';
import { CreateTodoDto } from '../dto/todo.Dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto, userId: string): Promise<Todo> {
    const createdTodo = new this.todoModel({ ...createTodoDto, user: userId });
    return await createdTodo.save();
  }

  async FindTodoByUser(userId: string) {
    const findTodo = await this.todoModel
      .findById({ user: userId })
      .select('-user');
    return findTodo;
  }

  async findTodoById(todoId: string, userId: string) {
    const foundTodo = await this.todoModel.findOne({
      user: userId,
      _id: todoId,
    }); //.populate('user')
    return foundTodo;
  }

  async updateTodoList(id: string) {
    const UpdateTodo = await this.todoModel.findByIdAndUpdate(
      id,
      { ...Todo },
      { new: true },
    );
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
