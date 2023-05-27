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

  findOne(id: number) {
    const product = this._productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  // create(payload: CreateProductDto) {
  //   this.counter += 1;
  //   const newProduct = {
  //     id: this.counter,
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }

  // update(id: number, payload: UpdateProductDto) {
  //   // const productIndex = this.products.findIndex((item) => item.id === id);
  //   // if (productIndex === -1) throw new Error('Not found');
  //   // this.products[productIndex] = {
  //   //   id: id,
  //   //   ...payload,
  //   // };
  //   // return {
  //   //   data: this.products[productIndex],
  //   //   message: 'Product updated succesfully',
  //   // };

  //   const product = this.findOne(id);
  //   if (product) {
  //     const index = this.products.findIndex((item) => item.id === id);
  //     this.products[index] = {
  //       ...product,
  //       ...payload,
  //     };
  //     return this.products[index];
  //   }
  //   return null;
  // }

  // remove(id: number) {
  //   const index = this.products.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Product #${id} not found`);
  //   }
  //   this.products.splice(index, 1);
  //   return true;
  // }
}
