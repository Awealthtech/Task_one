/* eslint-disable prefer-const */
import {
  Controller,
  Post,
  Body,
  Get,
  ValidationPipe,
  UsePipes,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { CreateTodoDto } from '../Dto/todo.Dto';
// import { JoiValidationPipe } from '../validation/validation.middleware';
// import { CreateTodoValidator } from '../validation/todo.validation';
import { todo } from '../todos.mock';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodo(): CreateTodoDto[] {
    return todo;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTodo(@Body() createTodo: CreateTodoDto): CreateTodoDto {
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
// async create(@Body() todo: CreateTodoDto): Promise<Todo> {
//   return this.todoService.create(todo);
// }
//   @Body(new JoiValidationPipe(CreateTodoValidator))
//   todo: CreateTodoDto,
// ) {
//     return this.todoService.create(todo);
//   }
