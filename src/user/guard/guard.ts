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
    const userEmailExist = await this.userService.FindUserByEmail(value.email);
    const userNumberExist = await this.userService.FindUserByPhone(value.phoneNumber);
    console.log(userEmailExist);
    if (userEmailExist || userNumberExist)
      throw new BadRequestException(
        `email or phoneNumber already exist`,
      );
    return true;
  }
}

