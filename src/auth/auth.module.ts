import { Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { user, UserSchema } from './schema/user.schema';
import { secretKey } from './config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: user.name, schema: UserSchema }]),
    JwtModule.register({
      secret: secretKey.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure() {}
}
