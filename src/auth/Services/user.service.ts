import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../Model/user.model';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../Dto/User.Dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // User signup Get
  userSignupGet() {
    return 'signup response provider successfully created';
  }

  // user signup post
  async userSignupPost(userDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(userDto);
    const result = await this.hashPassword(createUser.password);
    createUser.password = result;
    console.log('user saved');
    return await createUser.save();
  }

  async findById(id: string): Promise<User> {
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
