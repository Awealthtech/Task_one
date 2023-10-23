import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '../Services/user.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserDto, UserLoginDto } from '../Dto/User.Dto';
import { JoiValidationPipe } from '../validation/Joi.Validation';
import {
  CreateUserValidator,
  LoginUserValidator,
} from '../validation/user.validator';
import { User } from '../Model/user.model';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async CreateUser(
    @Body(new JoiValidationPipe(CreateUserValidator))
    CreateUserDto: CreateUserDto,
  ) {
    const user = this.userService.createUser(CreateUserDto);
    console.log(CreateUserDto);
    return user;
  }

  @Get('login')
  login() {
    return this.userService.UserLoginGet();
  }

  @Post('login')
  loginUser(
    @Body(new JoiValidationPipe(LoginUserValidator)) LoginDto: UserLoginDto,
  ): Promise<{ token: string }> {
    return this.userService.Login(LoginDto);
  }

  @Get('find-user-by-email')
  async findUserByMail(email: string): Promise<User> {
    const findUser = await this.userService.FindByEmail(email);
    return findUser;
  }
}
