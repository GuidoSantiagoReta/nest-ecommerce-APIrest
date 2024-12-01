import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getNewMessage(): string {
    return 'yo soy nuevo';
  }
}


