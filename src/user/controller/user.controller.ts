import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserDto, UserLoginDto } from '../dto/User.Dto';
import { JoiValidationPipe } from '../../utils/Pipe/Joi.Validation';
import {
  CreateUserValidator,
  LoginUserValidator,
  // LoginUserValidator,
} from '../validations/user.validator';
import { User } from '../model/user.model';
import { CreateUserGuard } from '../guard/guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @UseGuards(CreateUserGuard)
  async CreateUser(
    @Body(new JoiValidationPipe(CreateUserValidator))
    CreateUserDto: CreateUserDto,
  ) {
    const user = this.userService.createUser(CreateUserDto);
    return user;
  }

  @Get('login')
  login() {
    return this.userService.UserLoginGet();
  }

  @Post('login')
  async loginUser(
    @Body(new JoiValidationPipe(LoginUserValidator)) LoginDto: UserLoginDto,
  ): Promise<{ token: string }> {
    const accessToken = await this.userService.Login(LoginDto);
    return accessToken;
  }

  @Get('find-user-by-email')
  async getUserByMail(email: string): Promise<User> {
    const findUser = await this.userService.FindUserByEmail(email);
    return findUser;
  }

  @Get('find-user-by-id/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const getUserById = await this.userService.findUserById(id);
    return getUserById;
  }

  @Get('get-users-list-page')
  async getUsersLIst(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.userService.getAllUsers(page, pageSize);
  }
}
