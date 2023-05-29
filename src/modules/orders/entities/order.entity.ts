import { ManyToOne, Entity, OneToMany } from 'typeorm';
import { Customer } from '../../database/entities/users/customer.entity';
import { OrderItem } from '../../database/entities/users/order-item.entity';
import { RootEntity } from './../../../common/root-entity';

export class Order extends RootEntity {
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}
