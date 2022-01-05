import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "src/auth/role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    username: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @Column({unique: true})
    email: string;

    @ApiProperty()
    @Column({ type: 'enum', enum: Role, default: Role.User })
    roles: Role;

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
}