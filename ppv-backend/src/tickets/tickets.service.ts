import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketsService extends TypeOrmCrudService<Ticket> {
    constructor(@InjectRepository(Ticket) private ticketRepository: Repository<Ticket>) {
        super(ticketRepository)
    }
}
