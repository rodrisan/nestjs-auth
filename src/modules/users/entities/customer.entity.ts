import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { RootEntity } from '../../../common/root-entity';
@Entity({ name: 'customers' })
export class Customer extends RootEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  phone: string;
}
