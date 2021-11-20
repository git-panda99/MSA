import { Controller, Request, Post, UseGuards, Get } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/local-auth.guard";

@ApiTags('auth')
@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    @ApiParam({name: 'email', type: 'string'})
    @ApiParam({name: 'password', type: 'string'})
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user.payload;
    }
}