import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('/signup')
  SignupGet() {
    return this.authService.userSignupGet();
  }

  @Post('/signup')
  SignupPost() {
    return this.authService.userSignupPost();
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
