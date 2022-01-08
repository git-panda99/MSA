import { Body, Controller, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest} from '@nestjsx/crud';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { Event } from 'src/events/events.entity';
import { EventsService } from 'src/events/events.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Ticket } from './ticket.entity';
import { TicketsService } from './tickets.service';

@Crud({
    model: {
        type: Ticket
    }
})
@ApiTags('tickets')
@ApiBearerAuth()
@Controller('tickets')
export class TicketsController implements CrudController<Ticket>{
    constructor(public service: TicketsService, public eventService: EventsService, public userService: UsersService) {}

    @Roles(Role.User, Role.Organizer, Role.Admin)
    @ApiOperation({
        summary: 'Creates/Updates liked ticket',
        description: 'If no previos liked/bought ticket exists - a new ticket is added. If the ticket was previously created but not bought - the ticket is deleted. Else - like=true for existing ticket.'
    })
    @Post('like')
    @ApiBody({type: Ticket})
    async createOneLikedTicket(
        @Request() req: CrudRequest,
        @Body() dto: Ticket,
    ) {
        let event: Event = await this.eventService.findOne({where: {'id': dto.eventId}});
        let user: User = await this.userService.findOne({where: {id : dto.userId}});
        if(!event || !user)
            return new HttpException("Provide valid userId and eventId", HttpStatus.BAD_REQUEST);

        let ticket: Ticket = await this.service.findOne({where: {userId: dto.userId, eventId: dto.eventId}})
        if(ticket) {
            if(ticket.liked && ticket.purchaseDate==null)
                return this.service.delete(ticket.id);
            ticket.liked = !ticket.liked;
            return this.service.update(ticket.id, ticket);
        }

        dto.purchaseDate = null;
        dto.valid = false;
        dto.liked = true;
        
        return this.service.create(dto);
    }


    @Roles(Role.User, Role.Organizer, Role.Admin)
    @ApiOperation({
        summary: 'Creates purchased ticket',
        description: 'If no previos liked/bought ticket exists - a new ticket is added. If the ticket was previously created but not bought - the ticket is bought. Else - nothing changes.'
    })
    @Post('buy')
    @ApiBody({type: Ticket})
    async createOneBuyTicket(
        @Request() req: CrudRequest,
        @Body() dto: Ticket,
    ) {
        let event: Event = await this.eventService.findOne({where: {'id': dto.eventId}});
        let user: User = await this.userService.findOne({where: {id : dto.userId}});

        if(event.endDate < new Date())
            return new HttpException("The event has ended, ticket purchase is disabled.", HttpStatus.BAD_REQUEST);

        let ticket: Ticket = await this.service.findOne({where: {userId: dto.userId, eventId: dto.eventId}})
        if(ticket) {
            if(ticket.purchaseDate)
                return new HttpException("Ticket has already been purchased", HttpStatus.BAD_REQUEST);
            ticket.purchaseDate = new Date();
            ticket.valid = true;
            return this.service.update(ticket.id, ticket);
        }

        dto.purchaseDate = new Date();
        dto.valid = true;
        dto.liked = false;
        
        return this.service.create(dto);
    }
}
