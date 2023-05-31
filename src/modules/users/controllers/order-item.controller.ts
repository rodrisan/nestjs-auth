import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Put,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';

import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from './../dtos/order-item.dto';
import { OrderItemService } from './../services/order-item.service';
import { RootEntity } from 'src/common/root-entity';

import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth.guard';
import { Roles } from '../../../modules/auth/decorators/roles.decorator';
import { Role } from '../../../modules/auth/models/roles.model';
import { RolesGuard } from '../../../modules/auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Orders')
@Controller('order-item')
export class OrderItemController {
  constructor(private itemsService: OrderItemService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.itemsService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: RootEntity['id'],
    @Body() payload: UpdateOrderItemDto,
  ) {
    return this.itemsService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: RootEntity['id']) {
    return this.itemsService.remove(id);
  }
}
