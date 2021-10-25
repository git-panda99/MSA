import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Event} from "./events.entity";
import {Repository} from "typeorm";

@Injectable()
export class EventsService {

    constructor(
        @InjectRepository(Event) private readonly eventRepository: Repository<Event>
    ) {

    }
    
    async find(): Promise<Event[]> {
        return this.eventRepository.find();
    }
}
