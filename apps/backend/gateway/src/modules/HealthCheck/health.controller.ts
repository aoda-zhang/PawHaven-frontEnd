import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';

import NoToken from '../Auth/decorators/noToken.decorator';

import { HealthService } from './health.service';

@Controller()
@ApiTags('System health check')
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @NoToken()
  @Get('/health')
  @HealthCheck()
  healthChecker() {
    return this.health.healthChecker();
  }

  @NoToken()
  @Get('/ping')
  ping() {
    return this.health.ping();
  }
}
