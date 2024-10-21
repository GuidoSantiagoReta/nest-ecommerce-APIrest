
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType} from '@nestjs/config';
import config from './config';
@Injectable()
export class AppService {

  constructor(
    @Inject(config.KEY) private configServ: ConfigType<typeof config>,
    //private configService: ConfigService,
   //@Inject('APIKEY') private apiKey: string, 
    @Inject('TAREA_ASINC') private tarea: any) {}
  
  getHello(): string {
    //const apiKey = this.configService.get<string>('APIKEY');
    //const dbname= this.configService.get<string>('DB_NAME');
    const apiKey = this.configServ.apiKey;
    const dbname = this.configServ.database.name;
    const dbport = this.configServ.database.port;
    return `La llave de la aplicacion es: ${apiKey}  y el nombre de la base de datos es: ${dbname} y el puerto es: ${dbport} `;
  }

  getUseFactory(): string {
    console.log(this.tarea); 
    return `Realizando una tarea asíncrona de ejemplo. La tarea es: ${JSON.stringify(this.tarea)}`;
  }
}
