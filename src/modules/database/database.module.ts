import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../../common/config';

const API_KEY = '123456789';
const API_KEY_PROD = 'PROD123456789';

// const client = new Client({
//   user: 'root',
//   host: 'localhost',
//   database: 'postgres',
//   port: 5432,
//   password: 'toor',
// });

// client.connect();
// client.query('SELECT * FROM tasks', (err, res) => {
//   console.error(err);
//   console.log(res.rows);
// });

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        // const { dbName, dbUser, dbPass, dbHost, dbPort } = configService.postgres;
        return {
          type: 'postgres',
          url: configService.postgresUrl,
          synchronize: false,
          autoLoadEntities: true,
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
      inject: [config.KEY],
    }),
    // TypeOrmModule.forRootAsync({
    //   name: 'mysqlDB',
    //   useFactory: (configService: ConfigType<typeof config>) => {
    //     const { dbName, dbUser, dbPass, dbHost, dbPort } = configService.mysql;
    //     return {
    //       type: 'mysql',
    //       host: dbHost,
    //       port: dbPort,
    //       username: dbUser,
    //       password: dbPass,
    //       database: dbName,
    //       synchronize: true,
    //       autoLoadEntities: true,
    //     };
    //   },
    //   inject: [config.KEY],
    // }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        // const { dbUser, dbHost, dbName, dbPass, dbPort } = configService.postgres;
        const client = new Client({
          connectionString: configService.postgresUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
    // {
    //   provide: 'PG',
    //   useValue: client,
    // },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
