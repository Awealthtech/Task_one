/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/User.Dto';
import { Request } from 'express'

@Injectable()
export class CreateUserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    const value: CreateUserDto = req.body //as unknown as CreateUserDto;
    const userEmailExist = this.userService.FindUserByEmail(value.email);
    if (userEmailExist)
      throw new BadRequestException(
        `user with these ${value.email} already exist, pls provide a new email to proceed`,
      );
    return true;
  }
}

