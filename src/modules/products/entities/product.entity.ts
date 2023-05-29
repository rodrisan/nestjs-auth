import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { RootEntity } from '../../../common/root-entity';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

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

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' }) // Should be defined on one side only.
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];
}
