import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { ApiKeyGuard } from './modules/auth/guards/api-key.guard';
import { Public } from './modules/auth/decorators/public.decorator';

ApiTags('App');
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @SetMetadata('isPublic', true)
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }

  @Get('test-guard')
  testGuard() {
    return 'Test guard';
  }
}
