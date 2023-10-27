import { JwtService } from '@nestjs/jwt';
import { secretKey } from 'src/config/config';
import { UserService } from 'src/user/service/user.service';
import {} from '@nestjs/common';

export class TokenService {
  JwtService: any;
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  //method to sign your jwt
  async generateToken(payload: { id: any }) {
    const token = await this.JwtService.sign(payload, secretKey, {
      expiresIn: '1h',
    });
    return token;
  }
  //method to verify token
  async verifyToken() {
    const verify = await this.JwtService.verify()
  }
}
