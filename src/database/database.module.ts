import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import config from '../config';

const APIKEY = 'DEV-456';
const APIKEYPROD = 'PROD-12345';

@Global()
@Module({
  providers: [
    {
      provide: 'APIKEY',
      useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port,
        });
        client.connect((err) => {
          if (err) {
            console.error('connection error', err.stack);
          } else {
            console.log('connected to the database');
          }
        });
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['APIKEY', 'PG'],
})
export class DatabaseModule {}
