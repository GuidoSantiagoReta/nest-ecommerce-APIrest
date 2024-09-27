import { Controller, Get, Post, Put, Param, Body, Delete } from "@nestjs/common";

@Controller("productos")
export class ProductosController {
  //Decorador y método para obtener todos los productos
  @Get()
  getAllProducts() {
    return "Obtener todos los productos";
  }
  //Decorador y método para obtener producto por ID
  @Get(":idProduct")
  getProductById(@Param("idProduct") idProduct: string) {
    return `obtener el producto por ID: ${idProduct} `;
  }
  //Decorador y método para crear un producto
  @Post()
  createProduct(@Body() payload: any) {
    return {
      message: "crear producto",
      payload,
    };
  }
  //Decorador y método para modificar productos
  @Put("product/:idProduct")
  updateProducto(@Param("idProduct") idProduct: string, @Body() body: any): any {
    return {
      idProduct: idProduct,
      nombre: body.nombre,
      precio: body.precio,
    };
  }
  //Decorador y método para eliminar productos por ID
  @Delete(":idProduct")
  deleteProduct(@Param("idProduct") idProduct: string): any {
    return {
      idProduct: idProduct,
      delete: true,
      count: 1,
    };
  }
}
