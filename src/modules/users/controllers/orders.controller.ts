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

import { OrdersService } from './../services/orders.service';
import { CreateOrderDto, UpdateOrderDto } from './../dtos/order.dto';
import { RootEntity } from 'src/common/root-entity';
import { GeneralFilterDto } from '../../../common/dtos/general-filter.dto';
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth.guard';
import { Roles } from '../../../modules/auth/decorators/roles.decorator';
import { Role } from '../../../modules/auth/models/roles.model';
import { RolesGuard } from '../../../modules/auth/guards/roles.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @ApiOperation({ summary: 'Get all Orders' })
  @Get()
  findAll(@Query() params: GeneralFilterDto) {
    return this.orderService.findAll(params);
  }

  @ApiOperation({ summary: 'Get a Order by ID' })
  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: RootEntity['id']) {
    return this.orderService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new Order' })
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @ApiOperation({ summary: 'Update an existing Order' })
  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: RootEntity['id'],
    @Body() payload: UpdateOrderDto,
  ) {
    return this.orderService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete an existing Order' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: RootEntity['id']) {
    return this.orderService.remove(id);
  }
}
