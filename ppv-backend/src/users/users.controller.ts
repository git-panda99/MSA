import { Body, Controller, Get, HttpException, HttpStatus, Param, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateManyDto, Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { Public } from 'src/auth/public.decorator';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { MailService } from 'src/mail/mail.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Crud({
    model: {
        type: User
    }
})
@ApiTags('users')
@Controller('users')
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService, private mailService: MailService) {}

    get base(): CrudController<User> {
        return this;
    }

    @Public()
    @ApiOperation({summary: 'Retrieve a single User by email'})
    @Get(':email')
    async getByEmail(@Param('email') email: string) {
        const user = await this.service.findOne({ email });
        if (user) {
          return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
      }

    @Override('getManyBase')
    @Public()
    getUsers(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.getManyBase(req);
    }

    @Override('getOneBase')
    @Public()
    getOneUser(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.getOneBase(req);
    }

    @Override('createOneBase')
    @Public()
    async createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: User,
    ) {
        return this.service.create(dto);
    }

    @Override('createManyBase')
    @ApiBearerAuth()
    @Roles(Role.Admin)
    createMany(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<User>
    ) {
        return this.base.createManyBase(req, dto);
    }

    @Override('updateOneBase')
    @ApiBearerAuth()
    updateOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: User,
    ) {
        return this.base.updateOneBase(req, dto);
    }

    @Override('replaceOneBase')
    @ApiBearerAuth()
    @Roles(Role.Admin)
    replaceOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: User,
    ) {
        return this.base.replaceOneBase(req, dto);
    }

    @Override('deleteOneBase')
    @ApiBearerAuth()
    async deleteOne(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.deleteOneBase(req);
    }
}
