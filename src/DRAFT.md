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
# 01/10

# Entidades
Es una clase que encapsula los atributos y comportamientos de un objeto específico para defirnir el tipo de dato.

Crear entidad a mano.

__Ejemplo:__
```
producto.entity.ts

```
## Servicios 

- Son clases de TypeScript que se utilizan para encapsular la lógica de negocio y compartir funcionalidades entre diferente componentes de una aplicación, como controladores, módulos y otros servicios.
- Siguen el principio de inyección de dependencias que significa que pueden ser facilmente inyectados en componentes quelo necesiten. Promueve lamodularidad, reutilizacióny testabilidad
del código.
- Por lo general un servicio contendrá métodos que realizan tareas específicas. como interactuar con una base de datos , realizar llamadas a una API.
- Se define una entidad dentro del servicio que pueda representar un vector de las diferentes entidades.


__crear servicio__

```
nest generate service <nombre del servicio>

```


__app.module__

- Contiene  los controladores, los servicios creados( se guardan en providers).


## Pipe en nest
 - Sirve para validación y transformación de datos de entrada antes que sean procesados por la lógica de negocio.
(validación, transfomación, normalización y filtrado)

__crear pipe (se puede crear dentro de una carpeta common)__

```
nest g pipe

```


# 3/10

## DTO (data tranfers objects)
- Es una Máscara para filtrar que la entrada de datos sean correctos.

- Sirve para Validar la estructura y tipos de datos al recibir información desde el cliente.
- Protege la API de solicitudes malformadas o maliciosas.
- Facilita la creación y actualización de productos de manera segura y consistente.
- Cuando un cliente quiere crear o actualizar un producto, debe enviar sus datos en formato JSON que coincida con la estructura definida en estos DTOs. Por ejemplo:
NestJS utilizará estas clases para validar automáticamente los datos recibidos antes de procesarlos en tu servicio. Esto ayuda a mantener la integridad de tus datos y prevenir errores potenciales en tu aplicación.

En resumen, el DTO proporciona una capa de abstracción y validación entre la API y los datos externos, mejorando la seguridad y la robustez de tu aplicación.


## biblitecas para trabajar con dtos

__@nestjs/mapped-types__

 Proporciona tipos utilitarios para trabajar con objetos mapeados en NestJS.

__Propósito:__

Permite crear tipos que se basan en otros tipos existentes.
Facilita la creación de DTOs (Data Transfer Objects) más flexibles y reutilizables.

__Uso común:__

PartialType: Crea un tipo que incluye todas las propiedades del tipo original, pero como opcionales.
PickType: Crea un tipo que contiene solo ciertas propiedades específicas del tipo original.
OmitType: Crea un tipo que excluye ciertas propiedades del tipo origin

```
 npm i @nestjs/mapped-types

```

__class-validator__
Proporciona decoradores y validadores para validar datos en tiempo de ejecución.

__Propósito:__

Valida estructuras de datos en tiempo de ejecución.
Proporciona una capa adicional de seguridad para tus endpoints.
__Uso común:__

Decoradores como @IsString(), @IsNumber(), @IsEmail() para validar tipos de datos.
Validación personalizada para campos específicos.


```
npm i class-validator class-transformer

```

__class-transformer__

 Proporciona utilidades para transformar objetos entre formatos.

__Propósito:__

Facilita la conversión entre diferentes formatos de datos (por ejemplo, JSON a objetos TypeScript).
Permite serializar y deserializar objetos fácilmente.


```
 npm i class-transformer

```
# 8/10

## Módulos
- Es una forma de organizar y estructurar la aplicación, contiene componentes, controladores, servicios, y otros módulos.
- Se utilizan para encapsular la funcionalidad relacionada y definir el alcance de los componentes detro de una aplicación NestJS. Cada módulo puede tener sus propio controladores, servicios, y otra dependencias.

## Creando módulos para las entidades
- nest g mo operadores
- nest g mo productos
- Crear las cuatro carpetas correspondientes para cada módulo ( controllers, services, dtos y entities)

# 14/11
## Utilización de MONGODB en un dockerfile empezando todas las configuraciones y el proyecto desde módulos

- dockerfile con imagen mongo.
- configuración del modulo principal, databasemodule, config.ts y .env.
- Uso de mongocompass para gestionar las bases de datos.

# 25/11 

## Guards

 En NestJS, un guard es una clase que implementa la interfaz CanActivate y se utiliza para determinar si una solicitud entrante debe ser manejada por un controlador o no. Los guards se emplean comúnmente para la autenticación y autorización de las solicitudes.

__¿Qué es un guard?__

Un guard es una pieza de middleware que se ejecuta antes de que el controlador maneje la solicitud. Se puede usar para:

- Verificar si un usuario está autenticado.
- Comprobar si un usuario tiene los permisos necesarios para acceder a un recurso.
- Realizar otras verificaciones personalizadas antes de permitir el acceso a la ruta.

__Crear módulos y decoradores correspondientes:__

```
nest g mo auth
nest g gu auth/guards/apiKey --flat
nest g d auth/decorators/nombre --flat

```
__¿Para qué se utiliza?__

Los guards se utilizan principalmente para:

- Autenticación: Verificar si un usuario está autenticado antes de permitir el acceso a ciertas rutas.
- Autorización: Verificar si el usuario autenticado tiene permisos específicos para acceder a un recurso o realizar una acción.
- Verificación de roles: Asegurarse de que el usuario tenga un rol específico antes de acceder a un recurso.
- Realizar cualquier otra validación necesaria antes de permitir que la solicitud llegue al controlador.

__Autentificacion con Passport__
El hashing de contraseñas en NestJS, al igual que en otras plataformas y frameworks, es el proceso de transformar una contraseña en una representación de longitud fija mediante un algoritmo de hashing criptográfico. Este proceso se utiliza para almacenar contraseñas de manera segura en la base de datos y para verificar la autenticidad de las contraseñas ingresadas por los usuarios durante el inicio de sesión.

__¿Por qué es importante el hashing de contraseñas?__

- Seguridad: Almacenar contraseñas en texto plano en una base de datos es extremadamente inseguro. Si la base de datos es comprometida, las contraseñas en texto plano pueden ser fácilmente leídas y usadas por atacantes.
- Irreversibilidad: Un buen algoritmo de hashing es unidireccional, lo que significa que no es práctico revertir el proceso de hashing para obtener la contraseña original.
- Protección contra ataques: Los algoritmos de hashing están diseñados para ser lentos para hacer más difícil los ataques de fuerza bruta y los ataques de diccionario.

__Firmando contraseñas__

```
npm i bcrypt
npm i @types/bcrypt -D

```
__Passport__
Passport.js en NestJS facilita la implementación de diversas estrategias de autenticación y 
proporciona una estructura limpia y modular. Esto ayuda a mantener el código organizado, seguro y escalable.

```
npm install --save @nestjs/passport passport passport-local

npm install --save-dev @types/passport-local


```
ts-node para ejecutar un script que actualiza la base de datos

```
npx ts-node src/hashPasswordScript.ts
```

28/11 


# Conexion de Passport con JWT

Lo primero que debemos hacer es instalar los paquetes que nos permiten cumplir con dicho fin
```
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
```
Importamos el servicio JwtService y lo inyectamos como una dependencia.  
Luego crearemos un método donde indicamos el payload, con el rol y el ID del operador.  
A continuación realizamos un tipado de nuestro payload en el archivo token.model.ts



##  Excepciones con JWT Guard   

Hay oportunidades en que la utilización del token es innecesaria, métodos de un controller que deberían ser excluidos de dichas verificaciones.  Para dichos casos procederemos de la siguiente manera. 
Crearemos un nuevo guardian: 

```
nest g gu auth/guards/jwt-auth --flat 

```
Luego de definir nuestro guardián personalizado, lo importamos en el controlador de producto y usamos como excepción al guardián el decorador público definido anteriormente.

## Roles

Hay momentos en el uso del sistema, en que es bueno discriminar qué actividades puede realizar un operador del mismo.  Es entonces una buena oportunidad para gestionar los roles.  P
rimero crearemos un nuevo modelo roles.model.ts
Definiremos a continuación un decorador para los roles roles.decorator.ts 
 Luego ambos los importamos en el controller de producto.  La idea es crear un guardián que pueda chequear los roles 
 ```
 nest g gu auth/guards/roles --flat 
 ```
Por último indicaremos en el controller el uso del nuevo guardián creado.



# Testing con JEST

Ejecutar Tests con Verbosidad Aumentada: 
Ejecutar Jest con la opción --verbose para obtener más detalles sobre los tests que fallaron.

```
npm run test -- --verbose

```

Ejecutar Tests con Cobertura: 
Ejecutar Jest con la opción --coverage para obtener un informe detallado de cobertura y ver cuáles archivos y funciones necesitan más tests.

```
npm run test -- --coverage
```
Explorar el Informe de Cobertura: 
Después de ejecutar los tests con cobertura, 
abrir el archivo 
coverage/lcov-report/index.html en tu navegador para ver un informe detallado de cobertura, que te ayudará a identificar áreas que necesitan más tests.