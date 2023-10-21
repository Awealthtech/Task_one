import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from '../Services/user.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserDto, UserLoginDto } from '../Dto/User.Dto';
import { JoiValidationPipe } from '../validation/Joi.Validation';
import { CreateUserValidator } from '../validation/user.validator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  // @UsePipes(new JoiValidationPipe(CreateUserValidator))
  async CreateUser(
    @Body(new JoiValidationPipe(CreateUserValidator))
    CreateUserDto: CreateUserDto,
  ) {
    // const { error } = CreateUserValidator.validate(CreateUserDto);
    // if (error) {
    //   return { error: error.details };
    // }
    const user = this.authService.createUser(CreateUserDto);
    console.log(CreateUserDto);
    return { user };
  }

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
