import { Body, Controller, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
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
    @Post('like')
    @ApiBody({type: Ticket})
    async createOneLikedTicket(
        @Request() req: CrudRequest,
        @Body() dto: Ticket,
    ) {
        let event: Event = await this.eventService.findOne({where: {'id': dto.eventId}});
        let user: User = await this.userService.findOne({where: {id : dto.userId}});
        dto.purchaseDate = null;
        dto.valid = false;
        console.log(event);
        console.log(user);
        if(event && user)
            return this.service.create(dto);
        throw new HttpException("Provide valid userId and eventId", HttpStatus.BAD_REQUEST);
    }


    @Roles(Role.User, Role.Organizer, Role.Admin)
    @Post('buy')
    @ApiBody({type: Ticket})
    async createOneBuyTicket(
        @Request() req: CrudRequest,
        @Body() dto: Ticket,
    ) {
        let event: Event = await this.eventService.findOne({where: {'id': dto.eventId}});
        let user: User = await this.userService.findOne({where: {id : dto.userId}});
        dto.purchaseDate = new Date();
        dto.valid = true;
        console.log(event);
        console.log(user);
        if(event && user)
            return this.service.create(dto);
        throw new HttpException("Provide valid userId and eventId", HttpStatus.BAD_REQUEST);
    }
}
