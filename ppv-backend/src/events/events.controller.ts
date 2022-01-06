import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateManyDto, Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { Public } from 'src/auth/public.decorator';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
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

    get base(): CrudController<Event> {
        return this;
    }

    @Override('getManyBase')
    @Public()
    getEvents(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.getManyBase(req);
    }

    @Override('getOneBase')
    @Public()
    getOneEvent(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.getOneBase(req);
    }

    @Override('createOneBase')
    @ApiBearerAuth()
    @Roles(Role.Organizer, Role.Admin)
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Event,
    ) {
        return this.base.createOneBase(req, dto);
    }

    @Override('createManyBase')
    @ApiBearerAuth()
    @Roles(Role.Admin)
    createMany(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<Event>
    ) {
        return this.base.createManyBase(req, dto);
    }

    @Override('updateOneBase')
    @ApiBearerAuth()
    @Roles(Role.Organizer, Role.Admin)
    updateOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Event,
    ) {
        return this.base.updateOneBase(req, dto);
    }

    @Override('replaceOneBase')
    @ApiBearerAuth()
    @Roles(Role.Admin)
    replaceOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Event,
    ) {
        return this.base.replaceOneBase(req, dto);
    }

    @Override('deleteOneBase')
    @ApiBearerAuth()
    @Roles(Role.Organizer, Role.Admin)
    async deleteOne(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.deleteOneBase(req);
    }
}
