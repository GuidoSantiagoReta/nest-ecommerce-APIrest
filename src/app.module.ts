import { Module, OnModuleInit, Inject } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';
import { HttpModule } from '@nestjs/axios';
import { Db } from 'mongodb';
import { ConfigModule, ConfigType } from '@nestjs/config';
import config from './config';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    OperadoresModule,
    ProductosModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule implements OnModuleInit {
  constructor(
    @Inject('MONGO') private readonly database: Db,
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
  ) {}

  async onModuleInit() {
    const taskCollection = this.database.collection('tasks');
    const tasks = await taskCollection.find().toArray();
    console.log(tasks);
  }
}

