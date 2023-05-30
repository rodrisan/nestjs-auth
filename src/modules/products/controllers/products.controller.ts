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
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ProductService } from 'src/modules/products/services/product.service';
// import { ParseIntPipe } from 'src/common/parse-int.pipe'; // Custom created.
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from 'src/modules/products/dtos/product.dto';
import { RootEntity } from './../../../common/root-entity';

@UseGuards(AuthGuard('jwt'))
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
  getOne(@Param('id', ParseUUIDPipe) id: RootEntity['id']) {
    // response.status(200).send({ message: `Product ${id}` });
    return this._productService.findOne(id);
  }

  @ApiOperation({ summary: 'List of Products' })
  @Get()
  get(@Query() params: FilterProductsDto, @Query('brand') brand: string) {
    return this._productService.findAll(params);
  }

  @ApiOperation({ summary: 'Create a new Product' })
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this._productService.create(payload);
  }

  @ApiOperation({ summary: 'Delete an existing Product' })
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: RootEntity['id'],
    @Body() payload: UpdateProductDto,
  ) {
    return this._productService.update(id, payload);
  }

  @ApiOperation({ summary: 'Add an existing Category to a Product' })
  @Put(':id/category/:categoryId')
  updateCategory(
    @Param('id', ParseUUIDPipe) id: RootEntity['id'],
    @Param('categoryId', ParseUUIDPipe) categoryId: RootEntity['id'],
  ) {
    return this._productService.addProductCategory(id, categoryId);
  }

  @ApiOperation({ summary: 'Delete an existing Product' })
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: RootEntity['id']) {
    return this._productService.remove(id);
  }

  @ApiOperation({ summary: 'Delete an existing Category to a Product' })
  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseUUIDPipe) id: RootEntity['id'],
    @Param('categoryId', ParseUUIDPipe) categoryId: RootEntity['id'],
  ) {
    return this._productService.removeProductCategory(id, categoryId);
  }
}
