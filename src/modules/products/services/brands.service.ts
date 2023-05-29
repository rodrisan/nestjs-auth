import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RootEntity } from './../../../common/root-entity';
import { GeneralFilterDto } from '../../../common/dtos/general-filter.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) // In order to use MySQL, pass the second param 'mysqlDB'.
    private _brandRepository: Repository<Brand>,
  ) {}

  findAll(filters?: GeneralFilterDto) {
    const { limit, offset } = filters;
    return this._brandRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: RootEntity['id']) {
    const category = await this._brandRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(data: CreateBrandDto) {
    const catName = data.name;
    const categoryExists = await this._brandRepository.findOne({
      where: { name: catName },
    });
    if (categoryExists) {
      throw new NotFoundException(
        `Category with name ${catName} already exists, the ID is ${categoryExists.id}`,
      );
    }
    const newCategory = this._brandRepository.create(data);
    return this._brandRepository.save(newCategory);
  }

  async update(id: RootEntity['id'], changes: UpdateBrandDto) {
    const category = await this._brandRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category id #${id} does not exists`);
    }
    this._brandRepository.merge(category, changes);
    return this._brandRepository.save(category);
  }

  async remove(id: RootEntity['id']) {
    const category = await this._brandRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category id #${id} does not exists`);
    }
    return this._brandRepository.delete(id);
  }
}
