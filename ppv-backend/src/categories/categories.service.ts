import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesService extends TypeOrmCrudService<Category>{
    constructor(@InjectRepository(Category) private categoryReposity: Repository<Category>) {
        super(categoryReposity)
    }
}
