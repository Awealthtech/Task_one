import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from 'src/utils/token/services/token.service';
import { Request } from 'express';
@Injectable()
export class TodoGuards implements CanActivate {
  extractTokenFromHeader: any;
  constructor(private tokenService: TokenService) {}
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    console.log(token);
    if (!token) {
      throw new UnauthorizedException();
    }
    const payLoad = await this.tokenService.verifyToken(token);
    request['user'] = payLoad;
    return true;
  }
}
