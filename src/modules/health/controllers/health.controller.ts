import { Controller, Get, HttpCode } from '@nestjs/common';
import { HealthService } from '../services/health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @HttpCode(200)
  health() {
    return this.healthService.health();
  }
}
