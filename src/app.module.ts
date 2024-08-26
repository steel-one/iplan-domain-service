import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';
import { HealthModule } from './health/health.module';
import { LocalesModule } from './modules/locale/locales.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`envs/${process.env.ENVIRONMENT}.env`],
    }),
    DatabaseModule,
    HealthModule,
    AuthModule,
    PaymentsModule,
    LocalesModule,
  ],
})
export class AppModule {}
