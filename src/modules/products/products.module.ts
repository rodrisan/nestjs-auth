import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { ProductsController } from './controllers/products.controller';
import { ProductService } from './services/product.service';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Brand } from './entities/brand.entity';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  exports: [ProductService, CategoriesService, BrandsService],
  imports: [TypeOrmModule.forFeature([Product, Category, Brand])],
  providers: [ProductService, BrandsService, CategoriesService],
})
export class ProductsModule {}
