# Proyecto Nest ( Ecommerce APIrest )

El objetivo es desarrollar una aplicación que gestione diferentes entidades de un e-commerce a través de sus respectivos controladores. Hasta ahora, he implementado los controladores para las siguientes entidades:

- Productos.
- Categorías.
- Compradores.
- Fabricantes.
- Operadores.
- Pedidos.

__Cada entidad tiene su propio Controller, que maneja las siguientes peticiones HTTP:__

__GET__ Para obtener uno o todos los registros.
__POST__ Para crear nuevos registros.
__PUT__ Para actualizar registros existentes.
__DELETE__ Para eliminar registros por ID.

#### Controlador Productos
__En el controlador de Productos, implementé métodos que permiten:__

- Obtener todos los productos.
- Obtener un producto por su ID.
- Crear un nuevo producto.
- Actualizar un producto existente.
- Eliminar un producto.

Para asegurarme de que las rutas y los datos funcionan correctamente, estoy utilizando Postman para probar cada uno de los endpoints de la API. 


__main.ts__

- Archivo principal de la aplicación


## Controllers
- Los controladores son clases responsables de manejar las solicitudes HTTP entrantes y devolver una respuesta. 
- Estos controladores son parte del sistema de enrutamiento de NestJS y están diseñados para ser modularizados y reutilizables.
- Cada controlador se asocia típicamente con una ruta o un conjunto de rutas específicas. Dentro de un controlador, puedes definir métodos que se corresponden con diferentes verbos HTTP, como GET, POST, PUT o DELETE, y cada uno manejará las solicitudes que lleguen a la ruta correspondiente.
- Un controlador puede manejar todas las solicitudes relacionadas con usuarios, como crear, leer, actualizar y eliminar usuarios. 
- Cada método del controlador correspondería a una acción específica sobre los usuarios, como obtener una lista de usuarios, obtener un usuario por su ID, crear un nuevo usuario, actualizar la información de un usuario existente o eliminar un usuario.
- Los controladores en NestJS suelen ser simples y contienen principalmente lógica relacionada con el manejo de solicitudes y la llamada a servicios que realizan la lógica de negocio. Esto permite mantener una separación clara de las responsabilidades entre el enrutamiento, la lógica de negocio y el acceso a datos en una aplicación NestJS.

__crear controlador específico__

```
nest generate controller <controller-name>  o abreviado

```
__ejemplo en una subcarpeta__

```
nest generate controller controllers/compradores

```

```
 nest g co <controller-name>

```










