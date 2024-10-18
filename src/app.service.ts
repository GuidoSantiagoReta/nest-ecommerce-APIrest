import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  // Inyectar la variable
  constructor(@Inject('APIKEY') private apiKey: string) {} 

  getHello(): string {
    return `La llave de la aplicacion es: ${this.apiKey}`;
  }
}
