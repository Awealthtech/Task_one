/* eslint-disable prefer-const */
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  Query,
  // Query,
} from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { CreateTodoDto, updateTodoDto } from '../Dto/todo.Dto';
import { ObjectValidationPipe } from '../../utils/Pipe/validation.pipe';
import {
  CreateTodoValidator,
  UpdateTodoValidator,
} from '../validation/todo.validation';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // @Get('View-Todo/:id')
  // async getAllTodoList(@Param('id') id: string) {
  //   const todoList = await this.todoService.FindAllTodo(id);
  //   return todoList;
  // }

  @Get('view-all-todo-list')
  async findAllTodoList() {
    const viewAll = await this.todoService.getAllTodoList();
    return viewAll;
  }

  @Post('Create-new-Todo')
  createTodo(
    @Body(new ObjectValidationPipe(CreateTodoValidator))
    createTodo: CreateTodoDto,
  ) {
    const newTodo = this.todoService.create(createTodo);
    return newTodo;
  }

  @Put('Update-todo/:id')
  async updateTodo(
    @Body(new ObjectValidationPipe(UpdateTodoValidator))
    updateTodo: updateTodoDto,
    @Param('id') id: string,
  ) {
    const updateTodoList = await this.todoService.updateTodoList(id);
    return updateTodoList;
  }

  @Delete('delete-todo/:id')
  deleteTodo(@Param('id') id: string) {
    const deleteTodo = this.todoService.deleteTodoList(id);
    return deleteTodo;
  }

  @Get('get-todo-list-page')
  async getTodoLIst(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.todoService.getAllTodo(page, pageSize);
  }
}
