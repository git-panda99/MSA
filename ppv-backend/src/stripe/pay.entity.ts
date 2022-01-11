import { Entity } from "typeorm";

@Entity()
export class Pay {
    amount: number;
    currency: string;
    token: string;
}