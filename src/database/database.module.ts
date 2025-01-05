import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import config from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { user, host, dbName, password, port } = configService.get('postgres');
        return {
          type: 'postgres',
          //type: 'mysql',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'APIKEY',
      useFactory: (configService: ConfigService) => {
        return configService.get('NODE_ENV') === 'prod' ? configService.get('apiKeyProd') : configService.get('apiKey');
      },
      inject: [ConfigService],
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigService) => {
        const { user, host, dbName, password, port } = configService.get('postgres');
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
      inject: [ConfigService],
    },
  ],
  exports: ['APIKEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
