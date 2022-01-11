import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "src/auth/role.enum";
import { Status } from "./status.enum";
import { MailService } from "src/mail/mail.service";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    firstName: string;

    @ApiProperty()
    @Column()
    lastName: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @Column({unique: true})
    email: string;

    @ApiProperty()
    @Column({ type: 'enum', enum: Role, default: Role.User, nullable: true })
    roles: Role;

    @ApiProperty()
    @Column({ type: 'enum', enum: Status, default: Status.Pending })
    status: Status;

    @ApiProperty()
    @Column()
    confirmationCode: string;

    @ApiProperty()
    @Column({length:2000})
    description: string;

    @ApiProperty()
    @Column()
    imageUrl: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        try {
            const rounds = bcrypt.getRounds(this.password);
            if (rounds === 0) {
                this.password = await bcrypt.hash(this.password, 10);
            }
        } catch (error) {
        this.password = await bcrypt.hash(this.password, 10);
        }
    }

    @BeforeInsert()
    async setUserDetails() {
        this.roles = null;
        this.status = Status.Pending;

        //create confimation code token
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';
        for (let i = 0; i < 25; i++) {
            token += characters[Math.floor(Math.random() * characters.length )];
        }
        this.confirmationCode = token;
    }
}