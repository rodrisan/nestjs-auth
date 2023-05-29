import { ManyToOne, Entity, OneToMany } from 'typeorm';
import { Customer } from './../../users/entities/customer.entity';
import { OrderItem } from '../../users/entities/order-item.entity';
import { RootEntity } from './../../../common/root-entity';

export class Order extends RootEntity {
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}
