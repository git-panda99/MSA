import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

@Entity()
export class Auth {
    @ApiProperty()
    @Column()
    email: string;

    @ApiProperty()
    @Column()
    password: string;
}