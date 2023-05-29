import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { RootEntity } from './../../../common/root-entity';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @ApiOperation({ summary: 'Get all Brands' })
  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @ApiOperation({ summary: 'Get a Brand by ID' })
  @Get(':id')
  get(@Param('id', ParseIntPipe) id: RootEntity['id']) {
    return this.brandsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new Brand' })
  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @ApiOperation({ summary: 'Update an existing Brand' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: RootEntity['id'],
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete an existing Brand' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: RootEntity['id']) {
    return this.brandsService.remove(id);
  }
}
