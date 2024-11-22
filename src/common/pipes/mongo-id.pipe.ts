//pipe para validar que los IDs que se pasan a través de las rutas sean válidos como id de mongo para mayor seguridad
import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isMongoId(value)) {
      throw new BadRequestException(`${value} no es un ID de mongo`);
    }
    return value;
  }
}
