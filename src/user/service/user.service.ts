/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../model/user.model';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UserLoginDto } from '../dto/User.Dto';
import * as bcrypt from 'bcryptjs';
import { TokenService } from 'src/utils/token/services/token.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  // User signup Post
  async createUser(CreateUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, phoneNumber } = CreateUserDto;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
      });
      return newUser;
    } catch (error) {
      throw new Error('An error occurred while registering the user');
    }
  }

  async FindUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
  async FindUserByPhone(phoneNumber: string): Promise<User> {
    return this.userModel.findOne({ phoneNumber });
  }
  async findUserById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async Login(loginDto: UserLoginDto) {
    const { email, password } = loginDto;
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('invalid email');
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new UnauthorizedException('invalid email or password');
      }
      // const token = this.jwtService.sign
      const payload = { id: user._id };
      const token = this.tokenService.generateToken(payload);
      return { token };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('An error occurred while logging in');
    }
  }

  UserLoginGet() {
    return 'login successfully';
  }

  async getAllUsers(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    return this.userModel.find().skip(skip).limit(pageSize).exec();
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find({});
      return users;
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving users: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving users');
    }
  }
}

// async Login(loginDto: UserLoginDto): Promise<string> {
//   const { email, password } = loginDto;
//   try {
//     const user = await this.userModel.findOne({ email });
//     if (!user) {
//       throw new UnauthorizedException('invalid email');
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       throw new UnauthorizedException('invalid email or password');
//     }
//     // const token = this.jwtService.sign
//     const payload = { id: user._id };
//     const token = this.jwtService.sign(payload);
//     return token;
//   } catch (error) {
//     console.log(error);
//     throw new UnauthorizedException('An error occurred while logging in');
//   }
// }
