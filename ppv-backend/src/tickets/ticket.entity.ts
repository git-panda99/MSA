import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    userId: number;

    @ApiProperty()
    @Column()
    eventId: number;

    @ApiProperty()
    @Column()
    valid: Boolean;

    @ApiProperty()
    @Column()
    liked: Boolean;

    @ApiProperty()
    @Column({nullable: true})
    purchaseDate: Date;
}