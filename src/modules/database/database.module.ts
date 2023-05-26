import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from '../../common/config';

const API_KEY = '123456789';
const API_KEY_PROD = 'PROD123456789';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'postgres',
  port: 5432,
  password: 'toor',
});

client.connect();
// client.query('SELECT * FROM tasks', (err, res) => {
//   console.error(err);
//   console.log(res.rows);
// });

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, name, pass, port } = configService.database;
        const client = new Client({
          user,
          host,
          database: name,
          password: pass,
          port,
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
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
