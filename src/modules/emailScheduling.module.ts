import { Module } from '@nestjs/common';
import EmailSchedulingService from '../services/emailScheduling.service';
import { EmailModule } from './email.module';
import EmailSchedulingController from '../controllers/emailScheduling.controller';

@Module({
  imports: [EmailModule],
  controllers: [EmailSchedulingController],
  providers: [EmailSchedulingService],
  exports: [EmailSchedulingService]
})
export class EmailSchedulingModule {}