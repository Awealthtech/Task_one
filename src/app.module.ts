import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/Modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { todoModule } from './auth/Modules/todo.module';
import { ValidationMiddleware } from './auth/validation/validation.middleware';

@Module({
  imports: [
    todoModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationMiddleware)
      .forRoutes({ path: 'todo', method: RequestMethod.POST });
  }
}
