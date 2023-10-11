import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './Dto/User.Dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(user.name) private userModel: Model<user>,
    private jwtService: JwtService,
  ) {}

  // User signup Get
  userSignupGet() {
    return 'signup response provider successfully created';
  }
  // user signup post
  async userSignupPost(userDto: UserDto): Promise<user> {
    const createUser = await this.userModel.create(userDto);
    console.log('user saved');
    return createUser.save();
  }

  UserLoginPost(): string {
    return 'login request provider successfully created';
  }

  UserLoginGet() {
    return 'signup request provider successfully created';
  }
  async findByUsername(name: string) {
    return this.userModel.find({ name }).exec();
  }
}
