import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/modules/products/entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/modules/products/dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private _productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this._productRepository.find();
  }

  async findOne(id: number) {
    const product = await this._productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    // Using Active Record.
    // const newProduct = new Product();
    // newProduct.description = payload.description;
    // newProduct.image = payload.image;
    // newProduct.name = payload.name;
    // newProduct.price = payload.price;
    // newProduct.stock = payload.stock;

    // Using Repository Patter.
    const newProduct = this._productRepository.create(data);
    return this._productRepository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this._productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product id #${id} does not exists`);
    }
    this._productRepository.merge(product, changes);
    return this._productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this._productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product id #${id} does not exists`);
    }
    return this._productRepository.delete(id);
  }
}
