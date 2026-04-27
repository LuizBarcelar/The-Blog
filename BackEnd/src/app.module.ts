import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { UploadModule } from './upload/upload.module';

import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 10000,
          limit: 10,
          blockDuration: 5000,
        },
      ],
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const isSqlite = process.env.DB_TYPE === 'better-sqlite3';

        if (isSqlite) {
          return {
            type: 'better-sqlite3',
            database: process.env.DB_DATABASE || './db.sqlite',
            synchronize: process.env.DB_SYNCHRONIZE === '1',
            autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === '1',
          };
        }

        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT || '5432', 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,

          synchronize: process.env.DB_SYNCHRONIZE === '1',
          autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === '1',

          ssl: {
            rejectUnauthorized: false,
          },

          extra: {
            connectionTimeoutMillis: 5000,
          },
        };
      },
    }),

    AuthModule,
    UserModule,
    PostModule,
    UploadModule,
  ],

  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}