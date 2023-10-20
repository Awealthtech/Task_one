import { IsNotEmpty } from 'class-validator';
export class CreateTodoDto {
  id?: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  status: 'todo' | 'done' | 'in progress';
}
