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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { RootEntity } from './../../../common/root-entity';
import { GeneralFilterDto } from '../../../common/dtos/general-filter.dto';

ApiTags('Users');
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all Users' })
  @Get()
  findAll(@Query() params: GeneralFilterDto) {
    return this.usersService.findAll(params);
  }

  // @Get('tasks')
  // tasks() {
  //   return this.usersService.getTasks();
  // }

  @ApiOperation({ summary: 'Get a User by ID' })
  @Get(':id')
  get(@Param('id') id: RootEntity['id']) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Get all the Orders by a User' })
  @Get(':id/orders')
  getOrders(@Param('id') id: RootEntity['id']) {
    return this.usersService.getOrdersByUser(id);
  }

  @ApiOperation({ summary: 'Create a new User' })
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @ApiOperation({ summary: 'Update an existing Customer' })
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: RootEntity['id'],
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete an existing Customer' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: RootEntity['id']) {
    return this.usersService.remove(id);
  }
}
