import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from '../Services/user.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserDto, UserLoginDto } from '../Dto/User.Dto';
import { JoiValidationPipe } from '../validation/Joi.Validation';
import {
  CreateUserValidator,
  LoginUserValidator,
} from '../validation/user.validator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async CreateUser(
    @Body(new JoiValidationPipe(CreateUserValidator))
    CreateUserDto: CreateUserDto,
  ) {
    const user = this.authService.createUser(CreateUserDto);
    console.log(CreateUserDto);
    return { user };
  }

  @Get('/login')
  login() {
    return this.authService.UserLoginGet();
  }

  @Post('/login')
  loginUser(
    @Body(new JoiValidationPipe(LoginUserValidator)) LoginDto: UserLoginDto,
  ): Promise<{ token: string }> {
    return this.authService.Login(LoginDto);
  }
}
