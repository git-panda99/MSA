import { ApiProperty } from "@nestjs/swagger";
import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty()
    @Column()
    userId: number;

    @ApiProperty()
    @Column()
    categoryId: number;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    posterUrl: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    price: number;

    @ApiProperty()
    @Column()
    beginDate: Date;

    @ApiProperty()
    @Column()
    endDate: Date;

    @ApiProperty()
    @Column()
    type: string;

    @ApiProperty()
    @Column()
    source: string;

    @ApiProperty()
    @Column()
    videoUrl: string;

    @ApiProperty()
    @Column()
    ended: boolean;
}