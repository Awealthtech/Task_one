import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './Dto/User.Dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('/signup')
  SignupGet() {
    return this.authService.userSignupGet();
  }

  @Post('/signup')
  async SignupPost(@Body() UserDto: UserDto) {
    const User = await this.authService.userSignupPost(UserDto);
    const payload = { name: User.name, sub: User._id };
    const token = this.jwtservice.sign(payload);
    return { access_token: token };
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
