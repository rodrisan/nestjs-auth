import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ProductService } from 'src/modules/products/services/product.service';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/modules/products/dtos/product.dto';
import { RootEntity } from './../../../common/root-entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private _productService: ProductService) {}

  @ApiOperation({ summary: 'Filter a Product' })
  @Get('filter')
  filter() {
    return { message: `The filter` };
  }

  @ApiOperation({ summary: 'Get a Product' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: RootEntity['id']) {
    // response.status(200).send({ message: `Product ${id}` });
    return this._productService.findOne(id);
  }

  @ApiOperation({ summary: 'List of Products' })
  @Get()
  get(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this._productService.findAll();
  }

  @ApiOperation({ summary: 'Create a new Product' })
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this._productService.create(payload);
  }

  @ApiOperation({ summary: 'Delete an existing Product' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: RootEntity['id'],
    @Body() payload: UpdateProductDto,
  ) {
    return this._productService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete an existing Product' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: RootEntity['id']) {
    return this._productService.remove(id);
  }
}
