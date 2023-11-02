import { JwtService } from '@nestjs/jwt';

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenDto } from '../token.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateToken(tokenDto: TokenDto): Promise<string> {
    const token = this.jwtService.signAsync(tokenDto, {
      secret: this.configService.getOrThrow('SECRET_KEY'),
      expiresIn: this.configService.getOrThrow('TimeToLive'),
    });
    return token;
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('SECRET_KEY'),
      });
      return payload;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Jwt Expired');
      }
      throw new BadRequestException('Invalid Token');
    }
  }
}
