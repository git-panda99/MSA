import { Controller, Request, Post, UseGuards, Get, Body, Param, HttpException, HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Auth } from "./auth/auth.entity";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { Public } from "./auth/public.decorator";
import { Role } from "./auth/role.enum";
import { Roles } from "./auth/roles.decorator";
import { RolesGuard } from "./auth/roles.guard";
import { Status } from "./users/status.enum";
import { UsersService } from "./users/users.service";

@ApiTags('auth')
@Controller()
export class AppController {
    constructor(private authService: AuthService, private userSerivce: UsersService) {}

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

    @Public()
    @ApiOperation({summary: 'Confirm email address'})
    @Get('confirm/:token')
    async confirmEmail(@Param('token') token: string) {
        console.log('token'+token);
        const user = await this.userSerivce.findOne({ confirmationCode: token });
        user.status = Status.Active;
        this.userSerivce.update(user.id, user);
        if (user) {
            console.log(user);
          return user;
        }
        console.log('erorr');
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }
}