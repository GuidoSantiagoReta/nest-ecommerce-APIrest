import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';

const APIKEY ='DEV-456';
const APIKEYPROD = 'PROD-12345';

@Module({
  imports: [OperadoresModule, ProductosModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APIKEY',
      useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY,
    }

  ],
})
export class AppModule {}
