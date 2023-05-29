import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const AppDataSource = new DataSource({
  entities: ['src/**/**/*.entity.ts'],
  logging: false,
  migrations: ['src/modules/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
  type: 'postgres',
  url: process.env.POSTGRES_DATABASE_URL,
});

export { AppDataSource };
