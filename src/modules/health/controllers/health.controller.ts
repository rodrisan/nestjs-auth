import { Controller, Get, HttpCode } from '@nestjs/common';
import { HealthService } from '../services/health.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOperation({ summary: 'Health check' })
  @Get()
  @HttpCode(200)
  health() {
    return this.healthService.health();
  }
}
