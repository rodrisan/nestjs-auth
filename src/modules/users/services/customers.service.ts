import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private _customerRepository: Repository<Customer>,
  ) {}

  findAll() {
    return this._customerRepository.find();
  }

  async findOne(id: number) {
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

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this._customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer id #${id} does not exists`);
    }
    this._customerRepository.merge(customer, changes);
    return this._customerRepository.save(customer);
  }

  async remove(id: number) {
    const customer = await this._customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer id #${id} does not exists`);
    }
    return this._customerRepository.delete(id);
  }
}
