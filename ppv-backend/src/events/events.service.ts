import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Event} from "./events.entity";
import {Repository} from "typeorm";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class EventsService extends TypeOrmCrudService<Event> {
    constructor(@InjectRepository(Event) private eventRepository: Repository<Event>) {
        super(eventRepository)
    }

    async buyTicket(id: number, no:number) {
        const event: Event = await this.eventRepository.findOne({where: {'id':id}});
        event.noSoldTickets = event.noSoldTickets + no;
        await this.eventRepository.update({ id }, event);
        return await this.eventRepository.findOne({where: {'id':id}});
    }

    async likeTicket(id: number, no:number) {
        const event: Event = await this.eventRepository.findOne({where: {'id':id}});
        event.noHearts = event.noHearts + no;
        await this.eventRepository.update({ id }, event);
        return await this.eventRepository.findOne({where: {'id':id}});
    }
}
