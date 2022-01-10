import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
        super(usersRepository)
    }

    async update(id: number, data: Partial<User>) {
        await this.usersRepository.update({ id }, data);
        return await this.usersRepository.findOne({ id });
    }
}
