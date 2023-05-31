import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { RootEntity } from './../../../common/root-entity';
import { GeneralFilterDto } from '../../../common/dtos/general-filter.dto';
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth.guard';
import { Roles } from '../../../modules/auth/decorators/roles.decorator';
import { Role } from '../../../modules/auth/models/roles.model';
import { RolesGuard } from '../../../modules/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @ApiOperation({ summary: 'Get all Brands' })
  @Get()
  findAll(@Query() params: GeneralFilterDto) {
    return this.brandsService.findAll(params);
  }

  @ApiOperation({ summary: 'Get a Brand by ID' })
  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: RootEntity['id']) {
    return this.brandsService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new Brand' })
  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update an existing Brand' })
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: RootEntity['id'],
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete an existing Brand' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: RootEntity['id']) {
    return this.brandsService.remove(id);
  }
}
