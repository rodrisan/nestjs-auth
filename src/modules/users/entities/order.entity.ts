import { Product } from '../../products/entities/product.entity';
import { User } from './user.entity';
import { RootEntity } from '../../../common/root-entity';

export class Order extends RootEntity {
  date: Date;

  user: User;
  products: Product[];
}
