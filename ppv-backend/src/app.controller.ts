import { Controller, Request, Post, UseGuards, Get, Body } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Auth } from "./auth/auth.entity";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { Public } from "./auth/public.decorator";
import { Role } from "./auth/role.enum";
import { Roles } from "./auth/roles.decorator";
import { RolesGuard } from "./auth/roles.guard";

@ApiTags('auth')
@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @ApiOperation({summary: 'Login User with email and password'})
    @Post('auth/login')
    async login(@Body() auth: Auth) {
        console.log("this is req "+auth);
        return this.authService.login(auth);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User, Role.Organizer, Role.Admin)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Get profile for logged User'})
    @Get('profile')
    getProfile(@Request() req) {
        return req.user.payload;
    }
}