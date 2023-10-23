import { IsNotEmpty } from 'class-validator';
export class CreateTodoDto {
  id?: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  status: 'todo' | 'done' | 'in progress';
}
export class updateTodoDto {
  id?: string;
  title: string;
  description: string;
  status: 'todo' | 'done' | 'in progress';
}

export class SearchTodoDto {
  id: string[];
  title: string[];
}
