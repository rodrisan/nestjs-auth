import { Body, Controller, Get, Param } from '@nestjs/common';
import { RootEntity } from './../../../common/root-entity';

@Controller('orders2')
export class OrdersController2 {
  @Get()
  getAll() {
    return { message: 'Get all' };
  }

  getOne(@Param('id') id: RootEntity['id']) {
    return { message: `Get one ${id}` };
  }

  create(@Body() payload: any) {
    return { message: 'creation action', payload };
  }

  update(@Param('id') id: RootEntity['id'], @Body() payload: any) {
    return { message: 'update action', id, payload };
  }

  delete(@Param('id') id: RootEntity['id']) {
    return { message: 'delete action', id };
  }
}
