import { IsNotEmpty } from 'class-validator';

export class createQuizDto {
  @IsNotEmpty({ message: 'title must not be empty' })
  title: string;

  @IsNotEmpty({ message: 'description must not be empty' })
  description: string;
}
