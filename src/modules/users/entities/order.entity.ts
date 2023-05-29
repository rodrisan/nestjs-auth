import { CreateDateColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from './user.entity';

export class Order {
  date: Date;

  user: User;
  products: Product[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
