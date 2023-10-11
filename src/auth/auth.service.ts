import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(user.name) private userModel: Model<user>,
    private jwtService: JwtService,
  ) {}

  // User signup Get
  userSignupGet() {
    return 'signup response provider successfully created';
  }
  // user signup post
  async userSignupPost(
    name: string,
    password: string,
  ): Promise<{ message: string }> {
    try {
      const hash = await bcrypt.hash(password, 10);
      await this.userModel.create({ name, password: hash });
      return { message: 'User registered successfully' };
    } catch (error) {
      throw new Error('An error occurred while registering the user');
    }
  }

  UserLoginPost(): string {
    return 'login request provider successfully created';
  }

  UserLoginGet() {
    return 'signup request provider successfully created';
  }
}
