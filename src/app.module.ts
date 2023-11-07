import {  Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailSchedulingModule } from './modules/emailScheduling.module';

// mongodb+srv://gabriel:gab*012021@cluster0.50dcf.mongodb.net/school-mgt-db?retryWrites=true&w=majority

//'mongodb://127.0.0.1:27017/employees-mgt-db
// mongodb://localhost:27017/school-mgt-db

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        PORT: Joi.number(),
        DATABASECONNECTION: Joi.string().required(),
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required()
      })
    }),
    MongooseModule.forRoot('mongodb+srv://gabriel:gab*012021@cluster0.50dcf.mongodb.net/employees-mgt-db?retryWrites=true&w=majority'),
    UserModule,
    EmailSchedulingModule
    ],
     controllers: [],
     providers: []
})


export class AppModule {}