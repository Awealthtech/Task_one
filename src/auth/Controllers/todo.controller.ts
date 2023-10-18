import { Controller, Post, Body } from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { CreateTodoDto } from '../Dto/todo.Dto';
import { JoiValidationPipe } from '../validation/validation.middleware';
import { CreateTodoValidator } from '../validation/todo.validation';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Body(new JoiValidationPipe(CreateTodoValidator))
    todo: CreateTodoDto,
  ) {
    return this.todoService.create(todo);
  }
}
