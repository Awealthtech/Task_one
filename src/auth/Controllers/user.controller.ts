import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from '../Services/user.service';
import { CreateUserValidator } from '../validation/user.validator';
import { CreateUserDto } from '../Dto/User.Dto';
import { JoiValidationPipe } from '../validation/validation.middleware';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('/signup')
  SignupGet() {
    return this.authService.userSignupGet();
  }

  @Post('/signup')
  async SignupPost(
    @Body(new JoiValidationPipe(CreateUserValidator))
    user: CreateUserDto,
  ) {
    return this.authService.userSignupPost(user);
  }

  @Get('/login')
  loginGet() {
    return this.authService.UserLoginGet();
  }

  @Post('/login')
  loginPost() {
    return this.authService.UserLoginPost();
  }
}
