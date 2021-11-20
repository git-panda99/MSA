import { Controller, Request, Post, UseGuards } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "./auth/local-auth.guard";

@ApiTags('auth')
@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiParam({name: 'email', type: 'string'})
  @ApiParam({name: 'password', type: 'string'})
  async login(@Request() req) {
    return req.user;
  }
}