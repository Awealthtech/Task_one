import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from '../schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../Dto/User.Dto';
import * as bcrypt from 'bcrypt';

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
    // const result = await this.hashPassword(createUser.password);
    // createUser.password = result;
    console.log('user saved');
    return createUser.save();
  }

  async findById(id: string): Promise<user> {
    return this.userModel.findById(id).exec();
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
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
