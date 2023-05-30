import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { ApiKeyGuard } from './modules/auth/guards/api-key.guard';

ApiTags('App');
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }

  @UseGuards(ApiKeyGuard)
  @Get('test-guard')
  testGuard() {
    return 'Test guard';
  }
}
