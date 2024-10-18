import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(@Inject('APIKEY') private apiKey: string, @Inject('TAREA_ASINC') private tarea: any) {}

  getHello(): string {
    return `La llave de la aplicacion es: ${this.apiKey}`;
  }

  getUseFactory(): string {
    console.log(this.tarea); 
    return `Realizando una tarea asíncrona de ejemplo. La tarea es: ${JSON.stringify(this.tarea)}`;
  }
}
