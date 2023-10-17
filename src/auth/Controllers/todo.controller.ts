// import { Controller, Post, Body } from '@nestjs/common';
// import { TodoService } from '../services/todo.service';
// import { CreateTodoDto } from '../Dto/CreateTodo.Dto';

// @Controller('todo')
// export class TodoController {
//   constructor(private readonly todoService: TodoService) {}

//   @Post()
//   async create(@Body(new JoiValidationPipe(CreateTodoValidator)) {
//     return this.todoService.create(CreateTodoDto);
//   }
// }
