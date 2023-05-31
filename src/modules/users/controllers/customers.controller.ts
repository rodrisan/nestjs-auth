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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { RootEntity } from './../../../common/root-entity';
import { GeneralFilterDto } from '../../../common/dtos/general-filter.dto';

import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth.guard';
import { Roles } from '../../../modules/auth/decorators/roles.decorator';
import { Role } from '../../../modules/auth/models/roles.model';
import { RolesGuard } from '../../../modules/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @ApiOperation({ summary: 'Get all Customers' })
  @Get()
  @Get()
  findAll(@Query() params: GeneralFilterDto) {
    return this.customersService.findAll(params);
  }

  @ApiOperation({ summary: 'Get a Customer by ID' })
  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: RootEntity['id']) {
    return this.customersService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new Customer' })
  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update an existing Customer' })
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: RootEntity['id'],
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete an existing Customer' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: RootEntity['id']) {
    return this.customersService.remove(id);
  }
}
