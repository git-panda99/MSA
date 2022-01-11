import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Event} from "./events.entity";
import {Repository} from "typeorm";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { MailService } from 'src/mail/mail.service';
import { Ticket } from 'src/tickets/ticket.entity';

@Injectable()
export class EventsService extends TypeOrmCrudService<Event> {
    constructor(@InjectRepository(Event) private eventRepository: Repository<Event>,
                private userService: UsersService,
                private mailService: MailService) {
        super(eventRepository)
    }

    async buyTicket(user: User, id: number, no:number) {
        const event: Event = await this.eventRepository.findOne({where: {'id':id}});
        event.noSoldTickets = event.noSoldTickets + no;
        await this.eventRepository.update({ id }, event);
        await this.mailService.sendTicketConfirmation(user, event);
        return await this.eventRepository.findOne({where: {'id':id}});
    }

    async likeTicket(id: number, no:number) {
        const event: Event = await this.eventRepository.findOne({where: {'id':id}});
        event.noHearts = event.noHearts + no;
        await this.eventRepository.update({ id }, event);
        return await this.eventRepository.findOne({where: {'id':id}});
    }
}
