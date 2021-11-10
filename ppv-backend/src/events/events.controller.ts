import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Event } from './events.entity';
import { EventsService } from './events.service';

@Crud({
    model: {
        type:Event
    }
})
@ApiTags('events')
@Controller('events')
export class EventsController implements CrudController<Event>{
    constructor(public service: EventsService) {}
}
