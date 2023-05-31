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

import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './../dtos/category.dto';
import { RootEntity } from './../../../common/root-entity';
import { GeneralFilterDto } from '../../../common/dtos/general-filter.dto';
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth.guard';
import { Roles } from '../../../modules/auth/decorators/roles.decorator';
import { Role } from '../../../modules/auth/models/roles.model';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Get all Categories' })
  @Get()
  findAll(@Query() params: GeneralFilterDto) {
    return this.categoriesService.findAll(params);
  }

  @ApiOperation({ summary: 'Get a Category by ID' })
  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: RootEntity['id']) {
    return this.categoriesService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new Category' })
  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update an existing Category' })
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: RootEntity['id'],
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete an existing Category' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: RootEntity['id']) {
    return this.categoriesService.remove(id);
  }
}
