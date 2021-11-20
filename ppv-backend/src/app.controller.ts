import { Controller, Request, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller()
export class AppController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @ApiParam({name: 'email', type: 'string'})
  @ApiParam({name: 'password', type: 'string'})
  async login(@Request() req) {
    return req.user;
  }
}