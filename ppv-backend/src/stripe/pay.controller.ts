import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { PayService } from './pay.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('pay')
@ApiTags('pay')
export class PayController {
    constructor(private stripe:PayService) {}

    @Roles(Role.User, Role.Organizer, Role.Admin)
    @ApiOperation({
      summary: 'Charge for stripe',
    })
    @Post('')
    async createUsers(@Body() data: any) {
      return await this.stripe.charge(data);
      }
}
