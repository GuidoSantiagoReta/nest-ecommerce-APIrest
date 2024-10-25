import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor( 
    @Inject('PG') private clientPg: Client,
    @Inject(config.KEY) private configServ: ConfigType<typeof config>,
    @Inject('TAREA_ASINC') private tarea: any
  ) {}

  getHello(): string {
    const apiKey = this.configServ.apiKey;
    const dbname = this.configServ.database.name;
    const dbport = this.configServ.database.port;
    return `La llave de la aplicacion es: ${apiKey} y el nombre de la base de datos es: ${dbname} y el puerto es: ${dbport}`;
  }

  getUseFactory(): string {
    console.log(this.tarea);
    return `Realizando una tarea asíncrona de ejemplo. La tarea es: ${JSON.stringify(this.tarea)}`;
  }

  getTasks(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tareas', (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  }
}
