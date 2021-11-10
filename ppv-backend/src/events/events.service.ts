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
}
