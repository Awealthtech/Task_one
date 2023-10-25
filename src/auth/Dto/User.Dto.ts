export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export class UserLoginDto {
  email: string;
  password: string;
}
