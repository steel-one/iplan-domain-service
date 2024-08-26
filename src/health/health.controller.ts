import { Controller, Get, SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GRPCHealthIndicator,
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import {
  Health,
  HealthCheckResponse,
  HealthCheckResponse_ServingStatus,
} from '@proto.ts/health';

@SetMetadata('isPublic', true)
@Controller('health')
export class HealthController implements Health {
  constructor(
    private configService: ConfigService,
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private grpc: GRPCHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  checkHttp() {
    const grpcUrl = `0.0.0.0:${this.configService.get('Iplan_Domain_Grpc_Port')}`;
    return this.health.check([
      async () => this.db.pingCheck('typeorm'),
      async () =>
        this.grpc.checkService('grpc', 'grpc.health.v1', { url: grpcUrl }),
    ]);
  }

  @GrpcMethod('Health', 'Check')
  async check(): Promise<HealthCheckResponse> {
    return { status: HealthCheckResponse_ServingStatus.SERVING };
  }
}
