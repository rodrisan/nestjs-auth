import { Module } from '@nestjs/common';

import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';

@Module({
  controllers: [CustomersController, UsersController],
  exports: [UsersService, CustomersService],
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
