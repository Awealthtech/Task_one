import { Module, NestModule } from '@nestjs/common';
import { UserController } from '../Controllers/user.controller';
import { UserService } from '../Services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Model/user.model';
import { secretKey } from '../config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: secretKey.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AuthModule implements NestModule {
  configure() {}
}
