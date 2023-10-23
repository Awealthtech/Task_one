/* eslint-disable prefer-const */
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  // Query,
} from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { CreateTodoDto } from '../Dto/todo.Dto';
import { todo } from '../todos.mock';
import { JoiValidationPipe } from '../validation/Joi.Validation';
import { CreateTodoValidator } from '../validation/todo.validation';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodo(): CreateTodoDto[] {
    return todo;
  }

  // @Get(/page)
  // async getTodosPage(
  //   @Query('page') page: number = 1,
  //   @Query('limit') limit: number = 10,
  // ): Promise<Todo[]> {
  //   return this.TodoService.findAll(page, limit);
  // }

  @Post()
  createTodo(
    @Body(new JoiValidationPipe(CreateTodoValidator)) createTodo: CreateTodoDto,
  ): CreateTodoDto {
    const newTodo: CreateTodoDto = {
      id: (todo.length + 1).toString(),
      ...createTodo,
    };

    // todo = [...todo, newTodo];

    return newTodo;
  }

  @Put(':id')
  updateTodo(
    @Body() updateTodo: CreateTodoDto,
    @Param('id') id,
  ): CreateTodoDto {
    todo.map((todo) => (todo.id === id ? updateTodo : todo));
    return updateTodo;
  }

  @Delete(':id')
  deleteTodo(@Param('id') id): CreateTodoDto {
    const todoToDelete = todo.find((todo) => todo.id === id);
    todo.filter((todo) => todo.id !== id);
    return todoToDelete;
  }
}
