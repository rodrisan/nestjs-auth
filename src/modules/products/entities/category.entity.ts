import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { RootEntity } from '../../../common/root-entity';

@Entity({ name: 'categories' })
export class Category extends RootEntity {
  @Column({ type: 'varchar' })
  name: string;
}
