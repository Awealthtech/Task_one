import { Controller, Get, Post, Body } from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { CreateTodoDto } from '../Dto/CreateTodo.Dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() CreateTodoDto: CreateTodoDto) {
    return this.todoService.create(CreateTodoDto);
  }
}
