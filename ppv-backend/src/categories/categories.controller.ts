import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
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
}
