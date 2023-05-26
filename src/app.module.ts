import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { todosApi } from 'src/common/constants';
import { lastValueFrom } from 'rxjs';
import { DatabaseModule } from './modules/database/database.module';
import { environments } from './common/environments';
import config from './common/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [environments[process.env.NODE_ENV], '.env'],
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASS: Joi.string().required(),
        ALLOW_CORS: Joi.string().optional(),
      }),
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    HttpModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'todosApi',
      useValue: todosApi,
    },
    {
      provide: 'TASKS',
      // useFactory: is async and uses DI.
      // Calling for an API is not recommended!
      // Use it for DB connections.
      useFactory: async (http: HttpService) => {
        const request = http.get(`${todosApi}`);
        // const tasks = await (await firstValueFrom(request)).data; // This works too!.
        // const tasks = await lastValueFrom(request); // This works too!.
        const tasks = Promise.resolve(lastValueFrom(request));
        return tasks;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
