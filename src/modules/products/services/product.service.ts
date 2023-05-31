import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';

import { Product } from 'src/modules/database/entities/products/product.entity';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from 'src/modules/products/dtos/product.dto';
import { RootEntity } from './../../../common/root-entity';
import { Category } from '../../database/entities/products/category.entity';
import { Brand } from '../../database/entities/products/brand.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) // In order to use MySQL, pass the second param 'mysqlDB'.
    private _productRepository: Repository<Product>,
    @InjectRepository(Category)
    private _categoryRepository: Repository<Category>,
    @InjectRepository(Brand)
    private _brandRepository: Repository<Brand>,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset, maxPrice, minPrice } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this._productRepository.find({
        relations: ['brand', 'categories'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this._productRepository.find({ relations: ['brand', 'categories'] });
  }

  async findOne(id: RootEntity['id']) {
    const product = await this._productRepository.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    // Using Active Record.
    // const newProduct = new Product();
    // newProduct.description = payload.description;
    // newProduct.image = payload.image;
    // newProduct.name = payload.name;
    // newProduct.price = payload.price;
    // newProduct.stock = payload.stock;

    // Using Repository Patter.
    const newProduct = this._productRepository.create(data);
    if (data.brand_id) {
      const brand = await this._brandRepository.findOneBy({
        id: data.brand_id,
      });
      newProduct.brand = brand;
    }
    if (data.categories_ids) {
      const categories = await this._categoryRepository.findBy({
        id: In(data.categories_ids),
      });
      newProduct.categories = categories;
    }
    return this._productRepository.save(newProduct);
  }

  async update(id: RootEntity['id'], changes: UpdateProductDto) {
    const product = await this._productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product id #${id} does not exists`);
    }
    if (changes.brand_id) {
      const brand = await this._brandRepository.findOneBy({
        id: changes.brand_id,
      });
      product.brand = brand;
    }
    if (changes.categories_ids) {
      const categories = await this._categoryRepository.findBy({
        id: In(changes.categories_ids),
      });
      product.categories = categories;
    }
    this._productRepository.merge(product, changes);
    return this._productRepository.save(product);
  }

  async remove(id: RootEntity['id']) {
    const product = await this._productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product id #${id} does not exists`);
    }
    return this._productRepository.delete(id);
  }

  async addProductCategory(
    productId: RootEntity['id'],
    categoryId: RootEntity['id'],
  ) {
    const product = await this._productRepository.findOne({
      where: { id: productId },
      relations: ['brand', 'categories'],
    });
    const category = await this._categoryRepository.findOneBy({
      id: categoryId,
    });
    if (!category) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }
    const exists = product.categories.some(
      (element) => element.id === categoryId,
    );
    if (!exists) {
      product.categories.push(category);
    }
    return this._productRepository.save(product);
  }

  async removeProductCategory(
    productId: RootEntity['id'],
    categoryId: RootEntity['id'],
  ) {
    const product = await this._productRepository.findOne({
      where: { id: productId },
      relations: ['brand', 'categories'],
    });
    if (product.categories) {
      product.categories = product.categories.filter(
        (catItem) => catItem.id !== categoryId,
      );
    }
    return this._productRepository.save(product);
  }
}
