import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RootEntity } from './../../../common/root-entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private _customerRepository: Repository<Customer>,
  ) {}

  findAll() {
    return this._customerRepository.find();
  }

  async findOne(id: RootEntity['id']) {
    const customer = await this._customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newCustomer = this._customerRepository.create(data);
    return this._customerRepository.save(newCustomer);
  }

  async update(id: RootEntity['id'], changes: UpdateCustomerDto) {
    const customer = await this._customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer id #${id} does not exists`);
    }
    this._customerRepository.merge(customer, changes);
    return this._customerRepository.save(customer);
  }

  async remove(id: RootEntity['id']) {
    const customer = await this._customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer id #${id} does not exists`);
    }
    return this._customerRepository.delete(id);
  }
}
