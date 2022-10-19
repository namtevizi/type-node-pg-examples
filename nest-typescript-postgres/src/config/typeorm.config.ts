import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

async function stringToBoolean(str: string) {
  return !str ? false : str.toLocaleLowerCase() === 'true';
}

// NestJS Connection Config
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: process.env.DATABASE_TYPE || 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PSWD,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/**/*.js'],
      cli: {
        migrationsDir: 'dist/database/migrations',
      },
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: await stringToBoolean(process.env.DATABASE_SYNCHRONIZE),
      logging: await stringToBoolean(process.env.DATABASE_LOGGING),
    };
  },
};

// TypeORM Connection Config
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PSWD,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  cli: {
    migrationsDir: 'dist/database/migrations',
  },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  logging: true,
};
