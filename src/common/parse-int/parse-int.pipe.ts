import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any): number {
    // Comprobar si el valor es un string o un número
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new BadRequestException(`Validación fallida. El valor debe ser una cadena o un número, pero se ha recibido ${typeof value}`);
    }
    
    // Convertir el valor a string antes de parsear
    const val = parseInt(value.toString(), 10);

    if (isNaN(val)) {
      throw new BadRequestException('Validación fallida. El valor debe ser un número entero.');
    }

    return val;
  }
}