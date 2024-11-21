import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import config from '../config';

const APIKEY = 'DEV-456';
const APIKEYPROD = 'PROD-12345';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  providers: [
    {
      provide: 'APIKEY',
      useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } = configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        console.log('MongoDB URI:', uri);  // Verificar la URI 
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY, ConfigService],
    },
  ],
  exports: ['APIKEY', 'MONGO'],
})
export class DatabaseModule {}

