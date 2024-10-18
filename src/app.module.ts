import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';
import { HttpModule, HttpService } from '@nestjs/axios'; 
import { lastValueFrom } from 'rxjs';

const APIKEY ='DEV-456';
const APIKEYPROD = 'PROD-12345';
const TAREA_ASINC = 'TAREA_ASINC';

@Module({
  imports: [HttpModule,OperadoresModule, ProductosModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APIKEY',
      useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY,
    },
    {
      provide: TAREA_ASINC,
      useFactory: async (http: HttpService) => { 
        const req = http.get('https://jsonplaceholder.typicode.com/posts')
         const tarea = await lastValueFrom(req); 
        return tarea.data;
      },
      inject: [HttpService],
    },

   
  ],
})
export class AppModule {}
