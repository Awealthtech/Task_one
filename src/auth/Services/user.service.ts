import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../Model/user.model';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UserLoginDto } from '../Dto/User.Dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    priavate readonly tokenService: TokenService,
  ) {}

  // User signup Post
  async createUser(CreateUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, phoneNumber } = CreateUserDto;
     //do a this check in the guard
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new UnauthorizedException('User with email already exist');
    }
    const userNumber = await this.userModel.findOne({ phoneNumber });
    if (userNumber) {
      throw new UnauthorizedException('User with phone number already exist');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    return newUser;
  }

  async FindUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findUserById(id: string): Promise<User> {
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

  async getAllUsers(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    return this.userModel.find().skip(skip).limit(pageSize).exec();
  }
}
