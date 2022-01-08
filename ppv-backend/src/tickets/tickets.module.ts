import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { EventsService } from 'src/events/events.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { Event } from 'src/events/events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Event, User])],
  providers: [TicketsService, EventsService, UsersService],
  controllers: [TicketsController]
})
export class TicketsModule {}
