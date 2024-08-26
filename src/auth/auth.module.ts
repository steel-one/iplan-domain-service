import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwksClient } from 'jwks-rsa';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [ConfigModule],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    {
      provide: JwksClient,
      useFactory: (configService: ConfigService) =>
        new JwksClient({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: configService.get(
            'Iplan_Domain_Auth_JwksRequestsPerMinute',
          ),
          jwksUri: configService.get('Iplan_Domain_Auth_JwksUri')!,
        }),
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
