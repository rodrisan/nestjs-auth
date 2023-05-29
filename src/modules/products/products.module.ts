import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { Brand } from '../database/entities/products/brand.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from '../database/entities/products/category.entity';
import { ProductsController } from './controllers/products.controller';
import { ProductService } from './services/product.service';
import { Product } from '../database/entities/products/product.entity';
import { User } from '../database/entities/users/user.entity';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  exports: [ProductService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Product, Category, Brand, User])], // In order to use MySQL, pass the second param 'mysqlDB'.
  providers: [ProductService, BrandsService, CategoriesService],
})
export class ProductsModule {}
