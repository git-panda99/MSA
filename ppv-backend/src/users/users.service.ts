import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { Status } from './status.enum';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/role.enum';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>, private mailService: MailService) {
        super(usersRepository)
    }

    async create(data: Partial<User>) {
        data = await this.setUserDetails(data);
        data = await this.hashPassword(data);
        console.log(data);
        const user:User = await this.usersRepository.create( data);
        await this.usersRepository.save(data);
        console.log()
        console.log('response' + await this.mailService.sendUserConfirmation(user, user.confirmationCode));
        console.log(user);
        return await this.usersRepository.findOne({ where: {email: user.email} });
    }

    async update(id: number, data: Partial<User>) {
        await this.usersRepository.update({ id }, data);
        return await this.usersRepository.findOne({ id });
    }

    async setUserDetails(data: Partial<User>) {
        data.roles = Role.User;
        data.status = Status.Pending;

        //create confimation code token
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';
        for (let i = 0; i < 25; i++) {
            token += characters[Math.floor(Math.random() * characters.length )];
        }
        data.confirmationCode = token;

        return data;
    }

    async hashPassword(data: Partial<User>) {
        try {
            const rounds = bcrypt.getRounds(data.password);
            if (rounds === 0) {
                data.password = await bcrypt.hash(data.password, 10);
            }
        } catch (error) {
        data.password = await bcrypt.hash(data.password, 10);
        }

        return data;
    }
}
