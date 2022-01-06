import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
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
    constructor(public service: TicketsService) {}
}
