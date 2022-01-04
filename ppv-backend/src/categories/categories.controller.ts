import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateManyDto, Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { Public } from 'src/auth/public';
import { Category } from './categories.entity';
import { CategoriesService } from './categories.service';

@Crud({
    model: {
        type: Category
    }
})
@ApiTags('categories')
@Controller('categories')
export class CategoriesController implements CrudController<Category>{
    constructor(public service: CategoriesService) {}

    get base(): CrudController<Category> {
        return this;
    }

    @Override('getManyBase')
    @Public()
    getCategory(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.getManyBase(req);
    }

    @Override('getOneBase')
    @Public()
    getOneCategory(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.getOneBase(req);
    }

    @Override('createOneBase')
    @ApiBearerAuth()
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Category,
    ) {
        return this.base.createOneBase(req, dto);
    }

    @Override('createManyBase')
    @ApiBearerAuth()
    createMany(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<Category>
    ) {
        return this.base.createManyBase(req, dto);
    }

    @Override('updateOneBase')
    @ApiBearerAuth()
    updateOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Category,
    ) {
        return this.base.updateOneBase(req, dto);
    }

    @Override('replaceOneBase')
    @ApiBearerAuth()
    replaceOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Category,
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
