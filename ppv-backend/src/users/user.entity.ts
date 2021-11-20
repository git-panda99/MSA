import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    @Column()
    role: number;

    @ApiProperty()
    @Column()
    imageUrl: string;
}