import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './common/config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    // private _configService: ConfigService, // Replaced by ConfigType
    @Inject(config.KEY) private _configService: ConfigType<typeof config>,
    @Inject('TASKS') private tasks: any[],
    @Inject('PG') private _pgClient: Client,
  ) {}

  getHello(): string {
    // const apiKey = this._configService.get<string>('API_KEY');
    // const dbName = this._configService.get<string>('DATABASE_NAME');
    // const apiKey = this._configService.apiKey;
    // const dbName = this._configService.database.name;
    // console.log(this.tasks);
    return `Hello World!`;
  }

  // Using Promises: It works!
  // getTasks() {
  //   console.log('service');
  //   return new Promise((resolve, reject) => {
  //     this._pgClient.query('SELECT * FROM tasks', (err, res) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(res.rows);
  //     });
  //   });
  // }

  // Using async await
  public async getTasks(): Promise<any> {
    const res = await this._pgClient.query('SELECT * FROM tasks');
    return res.rows;
  }
}
