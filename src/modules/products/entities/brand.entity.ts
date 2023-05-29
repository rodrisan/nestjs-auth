import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { RootEntity } from '../../../common/root-entity';

@Entity({ name: 'brands' })
export class Brand extends RootEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  image: string;
}
