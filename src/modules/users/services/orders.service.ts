import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './../entities/order.entity';
import { Customer } from './../entities/customer.entity';
import { CreateOrderDto, UpdateOrderDto } from './../dtos/order.dto';
import { RootEntity } from 'src/common/root-entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private _orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private _customerRepository: Repository<Customer>,
  ) {}

  findAll() {
    return this._orderRepository.find();
  }

  async findOne(id: RootEntity['id']) {
    const order = await this._orderRepository.find({
      where: { id },
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException('not found');
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this._customerRepository.findOneBy({
        id: data.customerId,
      });
      order.customer = customer;
    }
    return this._orderRepository.save(order);
  }

  async update(id: RootEntity['id'], changes: UpdateOrderDto) {
    const order = await this._orderRepository.findOneBy({ id });
    if (changes.customerId) {
      const customer = await this._customerRepository.findOneBy({
        id: changes.customerId,
      });
      order.customer = customer;
    }
    return this._orderRepository.save(order);
  }

  remove(id: RootEntity['id']) {
    return this._orderRepository.delete(id);
  }
}
