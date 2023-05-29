import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RootEntity } from './../../../common/root-entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) // In order to use MySQL, pass the second param 'mysqlDB'.
    private _brandRepository: Repository<Brand>,
  ) {}

  findAll() {
    return this._brandRepository.find();
  }

  async findOne(id: RootEntity['id']) {
    const category = await this._brandRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateBrandDto) {
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
