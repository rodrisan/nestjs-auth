import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductService } from 'src/modules/products/services/product.service';
import { CustomersService } from './customers.service';
import { RootEntity } from './../../../common/root-entity';
import { GeneralFilterDto } from '../../../common/dtos/general-filter.dto';

@Injectable()
export class UsersService {
  constructor(
    private _productService: ProductService,
    private _configService: ConfigService,
    @InjectRepository(User) private _userRepository: Repository<User>,
    private _customerService: CustomersService,
  ) {}

  findAll(filters?: GeneralFilterDto) {
    const { limit, offset } = filters;
    return this._userRepository.find({
      relations: ['customer'],
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: RootEntity['id']) {
    const user = await this._userRepository.findOne({
      where: { id },
      relations: ['customer'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this._userRepository.create(data);
    if (data.customer_id) {
      const customer = await this._customerService.findOne(data.customer_id);
      newUser.customer = customer;
    }
    return this._userRepository.save(newUser);
  }

  async update(id: RootEntity['id'], changes: UpdateUserDto) {
    const user = await this._userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User id #${id} does not exists`);
    }
    this._userRepository.merge(user, changes);
    return this._userRepository.save(user);
  }

  async remove(id: RootEntity['id']) {
    const user = await this._userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User id #${id} does not exists`);
    }
    return this._userRepository.delete(id);
  }

  async getOrdersByUser(id: RootEntity['id']) {
    const user = await this._userRepository.findOneBy({ id });

    return {
      user,
      products: await this._productService.findAll(),
    };
  }
}
