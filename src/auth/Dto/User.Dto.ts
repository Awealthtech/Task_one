export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  phoneNumber: number;
}

export class UserLoginDto {
  email: string;
  password: string;
}
