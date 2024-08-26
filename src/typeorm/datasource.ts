import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({ path: `envs/${process.env.ENVIRONMENT}.env` });

export default new DataSource({
  type: 'postgres',
  host: process.env['Iplan_Domain_PGDB_Host'],
  port: parseInt(process.env['Iplan_Domain_PGDB_Port'] as string, 10),
  username: process.env['Iplan_Domain_TypeORM_Admin_Username'],
  password: process.env['Iplan_Domain_TypeORM_Admin_Password'],
  database: process.env['Iplan_Domain_PGDB_Database'],
  migrationsTableName: 'typeorm_migrations',
  entities: [__dirname + '/entities/*.ts'],
  migrations: [__dirname + '/migrations/*.ts'],
});
