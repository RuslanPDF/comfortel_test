import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { path } from 'app-root-path';

dotenv.config({ path: join(path, `.${process.env.NODE_ENV}.env`) });
export default {
  entities: ['./dist/infrastructure/persistence/schemas'],
  entitiesTs: ['./src/infrastructure/persistence/schemas'],
  migrations: {
    path: './dist/infrastructure/persistence/migrations',
    pathTs: './src/infrastructure/persistence/migrations',
    disableForeignKeys: false,
  },
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  driver: PostgreSqlDriver,
};