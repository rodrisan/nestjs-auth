import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { RootEntity } from '../../../../common/root-entity';
import { Customer } from './customer.entity';

@Entity({ name: 'users' })
export class User extends RootEntity {
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string; // @todo: Should be encrypted.

  @Column({ type: 'varchar', length: 255 })
  role: string;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn({ name: 'customer_id' }) // Should be defined on one side only.
  customer: Customer;
}
