import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from '../middlewares/authentication';
import { UserController } from '../controllers/user.controller';
import { UserSchema } from '../models/user.model';
import { UserService } from '../services/user.service';
import { CONTROLLER, GET_USERS, GET_USER,
    STORE, DELETE } from "../routes/user.route";
import { EmailSchedulingModule } from './emailScheduling.module';



@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    EmailSchedulingModule],
  controllers: [UserController],
  providers: [UserService]
})

export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${CONTROLLER}/${GET_USER}`, method: RequestMethod.GET },
      { path: `${CONTROLLER}/${GET_USERS}`, method: RequestMethod.GET },
      { path: `${CONTROLLER}/${DELETE}`, method: RequestMethod.DELETE },
    )
  }
}

