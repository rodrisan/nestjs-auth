import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { Brand } from './entities/brand.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';
import { ProductsController } from './controllers/products.controller';
import { ProductService } from './services/product.service';
import { Product } from './entities/product.entity';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  exports: [ProductService, CategoriesService, BrandsService],
  imports: [TypeOrmModule.forFeature([Product, Category, Brand])], // In order to use MySQL, pass the second param 'mysqlDB'.
  providers: [ProductService, BrandsService, CategoriesService],
})
export class ProductsModule {}
