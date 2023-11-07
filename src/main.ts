import { NestFactory } from '@nestjs/core';
const bodyParser =  require('body-parser')
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(bodyParser.json({limit: '100mb'}));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  app.use(cookieParser());
  await app.listen(process.env.PORT || 4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();