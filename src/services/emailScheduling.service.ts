import { Injectable } from '@nestjs/common';
import EmailService from '../services/email.service';
import EmailScheduleDto from '../dtos/emailSchedule.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export default class EmailSchedulingService {
  constructor(
    private readonly emailService: EmailService,
    private readonly schedulerRegistry: SchedulerRegistry
  ) {}

  scheduleEmail(emailSchedule: EmailScheduleDto) {
    //const date = new Date(emailSchedule.date);
    // Create new Date instance
    var date = new Date()
    // Add a day
    date.setDate(date.getDate() + 1)
    const job = new CronJob(date, () => {
      this.emailService.sendMail({
        to: emailSchedule.recipient,
        subject: emailSchedule.subject,
        text: emailSchedule.content
      })
    });

    this.schedulerRegistry.addCronJob(`${Date.now()}-${emailSchedule.subject}`, job);
    job.start();
  }
}