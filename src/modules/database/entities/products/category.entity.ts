import { Column, Entity, ManyToMany } from 'typeorm';

import { RootEntity } from '../../../../common/root-entity';
import { Product } from './product.entity';

@Entity({ name: 'categories' })
export class Category extends RootEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
