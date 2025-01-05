import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigType, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../config';



@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } = configService.mongo;
        return {
          uri: `${connection}://${user}:${password}@${host}:${port}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [ { provide: 'APIKEY', useFactory: (configService: ConfigService) => { return configService.get('NODE_ENV') === 'prod' ? configService.get('apiKeyProd') : configService.get('apiKey'); }, 
    inject: [ConfigService], }, ],
  //exclusión de 'MONGO' ahora Mongoose maneja la conexión a la base de datos
  exports: ['APIKEY', MongooseModule],
})
export class DatabaseModule {}


