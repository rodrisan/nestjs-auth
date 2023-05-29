import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../../database/entities/users/order.entity';
import { OrderItem } from '../../database/entities/users/order-item.entity';
import { Product } from '../../database/entities/products/product.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { RootEntity } from 'src/common/root-entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private _orderRepository: Repository<Order>,
    @InjectRepository(OrderItem) private _itemRepository: Repository<OrderItem>,
    @InjectRepository(Product) private _productRepository: Repository<Product>,
  ) {}

  async create(data: CreateOrderItemDto) {
    const order = await this._orderRepository.findOneBy({ id: data.orderId });
    const product = await this._productRepository.findOneBy({
      id: data.productId,
    });
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;
    return this._itemRepository.save(item);
  }

  async update(id: RootEntity['id'], changes: UpdateOrderItemDto) {
    const item = await this._itemRepository.findOneBy({ id });
    if (changes.orderId) {
      const order = await this._orderRepository.findOneBy({
        id: changes.orderId,
      });
      item.order = order;
    }
    if (changes.productId) {
      const product = await this._productRepository.findOneBy({
        id: changes.productId,
      });
      item.product = product;
    }
    this._itemRepository.merge(item, changes);
    return this._itemRepository.save(item);
  }

  remove(id: RootEntity['id']) {
    return this._itemRepository.delete(id);
  }
}
