import { Entity, Column, ManyToOne } from 'typeorm';

import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';
import { RootEntity } from '../../../common/root-entity';

@Entity({ name: 'order_item' })
export class OrderItem extends RootEntity {
  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Product) // Important: defining bidirectional relation depends if the logic requires it.
  product: Product;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
