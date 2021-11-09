import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {

    constructor(private eventService: EventsService) {

    }

    @Get()
    async all() {
        return this.eventService.find();
    }

    @Post()
    async create(
        @Body("title") title: string,
        @Body("posterUrl") posterUrl: string,
        @Body("description") description: string,
        @Body("price") price: string,
        @Body("beginDate") beginDate: Date,
        @Body("endDate") endDate: Date,
        @Body("type") type: string,
        @Body("source") source: string,
        @Body("videoUrl") videUrl: string,
    ) {
        return this.eventService.create({
            title, posterUrl, description,
            price, beginDate, endDate,
            type, source, videUrl
        })
    }
}
