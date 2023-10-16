import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'username must be empty' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @MinLength(8)
  password: string;

  @IsNotEmpty({ message: 'email is required' })
  phoneNumber: string;
}
