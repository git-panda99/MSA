import { Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
import { PayController } from './pay.controller';
import { PayService } from './pay.service';

@Module({
  imports: [
    StripeModule.forRoot({
    apiKey: process.env.SECRET_KEY,
    apiVersion: '2020-08-27',
  }),],
  providers: [PayService],
  controllers: [PayController]
})
export class PayModule {}
