import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Event} from "./events.entity"
import { MailModule } from 'src/mail/mail.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), MailModule, UsersModule],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService]
})
export class EventsModule {}
