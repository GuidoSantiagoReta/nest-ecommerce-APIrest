//El servicio contiene toda la lógica de negocio

import { Injectable, NotFoundException  } from '@nestjs/common';
import { Producto } from 'src/entities/producto.entity';
import { CreateProductDTO, UpdateProductDTO } from 'src/dtos/productos.dto';

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
    return this.productos;   // devuelve la lista de productos
}

findOne(id: number): Producto {
  const product = this.productos.find((item) => item.id === id);

  if (!product) {
    throw new NotFoundException(`El producto con id: #${id} no existe`);
  }
  return product;
}

create(payload: CreateProductDTO) {
  this.idCont = this.idCont + 1;
  const newProduct = {
    id: this.idCont,
    ...payload,
  };
  this.productos.push(newProduct);
  return newProduct;
}

update(id: number, payload: UpdateProductDTO) {
  const product = this.findOne(id);
  
  // findOne ya lanza una excepción si no encuentra el producto
  const index = this.productos.findIndex((item) => item.id === id);
  this.productos[index] = {
    ...product,
    ...payload,
  };
  return this.productos[index];
}

remove(id: number) {
  const product = this.findOne(id);
  
  // Si se encuentra, entonces eliminarlo
  const index = this.productos.findIndex((item) => item.id === id);
  this.productos.splice(index, 1);
  return { message: `Producto con id #${id} eliminado correctamente`, product };
}
  
}
