import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';

import { OrdersService } from './../services/orders.service';
import { CreateOrderDto, UpdateOrderDto } from './../dtos/order.dto';
import { RootEntity } from 'src/common/root-entity';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: RootEntity['id']) {
    return this.orderService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: RootEntity['id'],
    @Body() payload: UpdateOrderDto,
  ) {
    return this.orderService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: RootEntity['id']) {
    return this.orderService.remove(id);
  }
}
