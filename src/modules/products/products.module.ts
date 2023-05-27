import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { ProductsController } from './controllers/products.controller';
import { ProductService } from './services/product.service';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductService, BrandsService, CategoriesService],
  exports: [ProductService],
})
export class ProductsModule {}
