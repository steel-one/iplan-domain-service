import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('Iplan_Domain_PGDB_Host'),
        port: configService.get('Iplan_Domain_PGDB_Port'),
        username: configService.get('Iplan_Domain_PGDB_Username'),
        password: configService.get('Iplan_Domain_PGDB_Password'),
        database: configService.get('Iplan_Domain_PGDB_Database'),
        migrationsTableName: 'typeorm_migrations',
        migrationsRun:
          configService.get('Iplan_Domain_PGDB_Migrate') === 'true',
        entities: [__dirname + '/**/entities/*{.ts,.js}'],
        migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
        logging: configService.get('Iplan_Domain_PGDB_Logging'),
      }),
    }),
  ],
})
export class DatabaseModule {}
