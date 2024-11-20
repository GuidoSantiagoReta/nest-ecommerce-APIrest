import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';
import { DatabaseModule } from './database/database.module';
import { MongoClient } from 'mongodb';
import * as Joi from 'joi';

const uri = 'mongodb://mongo:secreta123@localhost:27017/?authMechanism=DEFAULT';


@Module({
  imports: [OperadoresModule, ProductosModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const database = client.db('admin');
      const taskCollection = database.collection('tasks');
      const tasks = await taskCollection.find().toArray();
      console.log(tasks);
    } finally {
      await client.close();
    }
  }
}

