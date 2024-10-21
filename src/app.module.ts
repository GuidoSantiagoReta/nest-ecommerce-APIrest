import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environments } from './environments';
import config from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';
import * as Joi from'joi';

const TAREA_ASINC = 'TAREA_ASINC';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],  //leer como archivo de tipado
      isGlobal: true,
      validationSchema:Joi.object({
        APIKEY: Joi.number().required(),
        DB_NAME:Joi.string().required(),
        DB_PORT: Joi.number().required(),
      })
    }),
    HttpModule,
    OperadoresModule,
    ProductosModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APIKEY',
      useFactory: (configService: ConfigService) => {
        return configService.get<string>('NODE_ENV') === 'prod'
          ? configService.get<string>('APIKEYPROD')
          : configService.get<string>('APIKEY');
      },
      inject: [ConfigService],
    },
    {
      provide: TAREA_ASINC,
      useFactory: async (http: HttpService) => {
        const req = http.get('https://jsonplaceholder.typicode.com/posts');
        const tarea = await lastValueFrom(req);
        return tarea.data;
      },
      inject: [HttpService],
    },
  ],
  
})

export class AppModule {}