import { Column, Entity, OneToMany } from 'typeorm';

import { RootEntity } from '../../../../common/root-entity';
import { Product } from './product.entity';

@Entity({ name: 'brands' })
export class Brand extends RootEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  image: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
