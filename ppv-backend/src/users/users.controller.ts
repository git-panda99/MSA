import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateManyDto, Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { Public } from 'src/auth/public.decorator';
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
    constructor(public service: UsersService) {}

    get base(): CrudController<User> {
        return this;
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
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: User,
    ) {
        return this.base.createOneBase(req, dto);
    }

    @Override('createManyBase')
    @ApiBearerAuth()
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
