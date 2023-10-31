import { JwtService } from '@nestjs/jwt';
import { secretKey } from 'src/config/config';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class TokenService {
  JwtService: any;
  extractTokenFromHeader: any;
  constructor(private jwtService: JwtService) {}
  // method to sign your jwt
  async generateToken(payload: { id: any }) {
    const token = await this.JwtService.sign(payload, secretKey, {
      expiresIn: '1h',
    });
    return token;
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: secretKey.secret,
      });
      Request['user'] = payload;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Jwt Expired');
      }
      throw new BadRequestException('Invalid Token');
    }
    return true;
  }

  // private extractTokenFromHeader(request: Request): string | undefined {
  //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //   if (!token) return;
  //   if (type != 'Bearer') {
  //     throw new BadRequestException('Please provide a Bearer token ');
  //   }
  //   return token;
  // return type === 'Bearer' ? token : undefined;
}
