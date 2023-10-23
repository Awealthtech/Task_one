import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../Model/user.model';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UserLoginDto } from '../Dto/User.Dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // User signup Post
  async createUser(CreateUserDto: CreateUserDto): Promise<{ token: string }> {
    const { name, email, password, phoneNumber } = CreateUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async FindByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async Login(loginDto: UserLoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('invalid email');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('invalid email or password');
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  UserLoginGet() {
    return 'login successfully';
  }

  async findByUsername(name: string) {
    return this.userModel.find({ name }).exec();
  }
}
