// import {
//   IsEmail,
//   IsInt,
//   IsNotEmpty,
//   IsString,
//   MinLength,
// } from 'class-validator';

export class CreateUserDto {
  // @IsString()
  name: string;

  // @IsEmail()
  // @IsNotEmpty()
  email: string;

  // @IsNotEmpty()
  // @MinLength(8)
  password: string;

  // @IsInt()
  phoneNumber: number;
}

export class UserLoginDto {
  // @IsNotEmpty()
  email: string;
  // @IsNotEmpty()
  password: string;
}
