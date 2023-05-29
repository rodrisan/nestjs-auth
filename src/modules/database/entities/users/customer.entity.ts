import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { RootEntity } from '../../../../common/root-entity';
import { User } from './user.entity';
import { Order } from './order.entity';
@Entity({ name: 'customers' })
export class Customer extends RootEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
