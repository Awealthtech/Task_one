import { Module } from '@nestjs/common';
import { TokenService } from './services/token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
// import { secretKey } from 'src/config/config';
import { User, UserSchema } from 'src/user/model/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      // secretKey.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [TokenService, JwtService],
  exports: [TokenService],
})
export class tokenModule {}
