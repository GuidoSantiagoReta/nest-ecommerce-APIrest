import { Operador }from './operador.entity';
import { Producto } from './../../productos/entities/producto.entity';

export class Pedido{
    date: Date;
    operador: Operador;
    products: Producto[];
  }

  //falta agregar typeorm solo a esta entidad  más adelante definir las relaciones