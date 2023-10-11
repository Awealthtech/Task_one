import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './Dto/User.Dto';

@Controller('auth')
export class AuthController {
  import: [UserDto];
  constructor(private authService: AuthService) {}
  @Get('/signup')
  SignupGet() {
    return this.authService.userSignupGet();
  }

  @Post('/signup')
  async SignupPost(@Body() UserDto: UserDto) {
    return this.authService.userSignupPost(UserDto);
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
