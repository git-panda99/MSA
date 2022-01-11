import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { PayService } from './pay.service';

@Public()
@Controller('pay')
@ApiTags('pay')
export class PayController {
    constructor(private stripe:PayService) {}

    @ApiOperation({
      summary: 'Charge for stripe',
    })
    @Post('')
    async createUsers(@Body() data: any) {
      return await this.stripe.charge(data);
      }
}
