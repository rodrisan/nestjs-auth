import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../../products/entities/product.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';

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
}
