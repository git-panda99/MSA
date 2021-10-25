import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    eventId: number;
    
    @Column()
    userId: number;

    @Column()
    categoryId: number;

    @Column()
    title: string;

    @Column()
    posterUrl: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    beginDate: Date;

    @Column()
    endDate: Date;

    @Column()
    type: string;

    @Column()
    source: string;

    @Column()
    videoUrl: string;

    @Column()
    tickets: string; //to add array later

    @Column()
    ended: boolean;
}