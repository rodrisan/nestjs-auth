import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from 'src/modules/products/services/product.service';

@Injectable()
export class UsersService {
  constructor(
    private _productService: ProductService,
    private _configService: ConfigService,
    @InjectRepository(User) private _userRepository: Repository<User>,
  ) {}

  findAll() {
    return this._userRepository.find();
  }

  async findOne(id: number) {
    const user = await this._userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    const newUser = this._userRepository.create(data);
    return this._userRepository.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this._userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User id #${id} does not exists`);
    }
    this._userRepository.merge(user, changes);
    return this._userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this._userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User id #${id} does not exists`);
    }
    return this._userRepository.delete(id);
  }

  async getOrdersByUser(id: number) {
    const user = await this._userRepository.findOneBy({ id });

    return {
      user,
      products: await this._productService.findAll(),
    };
  }
}
