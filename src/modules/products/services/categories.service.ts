import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../../database/entities/products/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RootEntity } from './../../../common/root-entity';
import { GeneralFilterDto } from '../../../common/dtos/general-filter.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) // In order to use MySQL, pass the second param 'mysqlDB'.
    private _categoryRepository: Repository<Category>,
  ) {}

  findAll(filters?: GeneralFilterDto) {
    const { limit, offset } = filters;
    return this._categoryRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: RootEntity['id']) {
    const category = await this._categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = this._categoryRepository.create(data);
    return this._categoryRepository.save(newCategory);
  }

  async update(id: RootEntity['id'], changes: UpdateCategoryDto) {
    const category = await this._categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category id #${id} does not exists`);
    }
    this._categoryRepository.merge(category, changes);
    return this._categoryRepository.save(category);
  }

  async remove(id: RootEntity['id']) {
    const category = await this._categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category id #${id} does not exists`);
    }
    return this._categoryRepository.delete(id);
  }
}
