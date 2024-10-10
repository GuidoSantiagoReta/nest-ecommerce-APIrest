import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';

@Controller('categorias')
export class CategoriasController {

//Decorador y método para obtener producto por ID

@Get(':idCategoria')
getCategoria(@Param('idCategoria') idCategoria: string): string {
    return `El ID de la categoria es: ${idCategoria}`;
}

//Decorador y método para crear un producto

 create(@Body() payload: any) {
    return {
        message: 'Acción de crear',
        payload,
    };
}

//Decorador y método para modificar productos

@Put(':idCategoria')
updateCategoria(
    @Param('idCategoria') idCategoria: string,
    @Body() body: any
): any {
    return {
        idCategoria: idCategoria,
        nombre: body.nombre,
        imagen: body.imagen
    }
}

//Decorador y método para eliminar productos por ID

@Delete(':idCategoria')
deleteCategoria(@Param('idCategoria') idCategoria: string): any {
    return {
        idCategoria: idCategoria,
        delete: true,
        count: 1
    };
}

}
