import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from '../Services/user.service';
// import { CreateUserValidator } from '../validation/user.validator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserDto, UserLoginDto } from '../Dto/User.Dto';
import { JoiValidationPipe } from '../validation/Joi.Validation';
import { CreateUserValidator } from '../validation/user.validator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(new JoiValidationPipe(CreateUserValidator))
  async CreateUser(
    @Body() CreateUserDto: CreateUserDto,
  ): Promise<{ token: string }> {
    return this.authService.createUser(CreateUserDto);
  }
  // @Body(new JoiValidationPipe(CreateUserValidator))
  // user: CreateUserDto,
  // ) {
  //   const newUser = this.authService.createUser(user);
  //   return newUser;
  // }

  @Get('/login')
  login() {
    return this.authService.UserLoginGet();
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  loginUser(@Body() LoginDto: UserLoginDto): Promise<{ token: string }> {
    return this.authService.Login(LoginDto);
  }
}
