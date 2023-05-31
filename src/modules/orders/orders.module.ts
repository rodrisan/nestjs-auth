import { Module } from '@nestjs/common';

import { OrdersController2 } from './controllers/orders.controller';

@Module({
  imports: [],
  controllers: [OrdersController2],
  providers: [],
})
export class OrdersModule {}
