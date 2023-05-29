import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { RootEntity } from '../../../common/root-entity';

@Entity({ name: 'products' })
export class Product extends RootEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;
}
