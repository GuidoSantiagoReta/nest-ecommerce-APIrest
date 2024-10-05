//El servicio contiene toda la lógica de negocio

import { Injectable } from '@nestjs/common';
import { Producto } from 'src/entities/producto.entity';

@Injectable()
export class ProductosService {
  private idCont = 1;

  private productos: Producto[] = [
    {
      id: 1,
      nombre: ' Prod A',
      descripcion: ' Description product A',
      precio: 7000,
      stock: 1,
      origen: 'China',
      imagen: '',
    },
    {
      id: 2,
      nombre: ' Prod B',
      descripcion: ' Description product B',
      precio: 7000,
      stock: 1,
      origen: 'Taiwan',
      imagen: '',
    },
  ];

  findAll(){    
    return this.productos;   // devuelve una copia del array  en caso de modificaciones del arreglo original
}

  
}
