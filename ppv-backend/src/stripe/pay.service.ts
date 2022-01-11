import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { Pay } from './pay.entity';

@Injectable()
export class PayService {
    public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

    charge(data: Pay) {
        this.stripeClient.charges.create({
            amount: data.amount,
            currency: data.currency,
            source: data.token,
            description: 'My First Test Charge (created for API docs)',
              }).then((charge) => {
                console.log(charge);
                return charge;
            })
              .catch((err) => {
                console.log(err);
                return err;
              });
    }
}
