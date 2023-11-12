/* eslint-disable prefer-const */
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Request,
  Delete,
  Query,
  UseGuards,
  // Query,
} from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { CreateTodoDto, updateTodoDto } from '../Dto/todo.Dto';
import { ObjectValidationPipe } from '../../utils/Pipe/validation.pipe';
import {
  CreateTodoValidator,
  UpdateTodoValidator,
} from '../validation/todo.validation';
import { TodoGuards } from '../guard/todo.guard';
import { TokenDto } from 'src/utils/token/token.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('Create-new-Todo')
  @UseGuards(TodoGuards)
  createTodo(
    @Body(new ObjectValidationPipe(CreateTodoValidator))
    createTodo: CreateTodoDto,
    @Request()
    request,
  ) {
    const user: TokenDto = request['user'];
    console.log(user);
    const newTodo = this.todoService.create(createTodo, user.userId);
    return newTodo;
  }

  @Get('View-Todo/:id')
  async getAllTodoList(@Param('id') id: string, @Request() request) {
    const { userId } = request['user'];
    const todoList = await this.todoService.findTodoById(id, userId);
    return todoList;
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
