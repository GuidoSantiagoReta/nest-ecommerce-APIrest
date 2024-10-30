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






# 10/10  ( Se realiza toda la migración completa a módulos con sus propios servicios, dtos, entidades, y controladores).

## Migración de módulos, pruebas con postman y tareas asíncronas

- Tareas Realizadas en feature/unificar módulos.



## Variables de entorno con useValue 

__Inyectar la variable en AppService:__

```
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('APIKEY') private apiKey: string) {} 

  getHello(): string {
    return `La llave de la aplicacion es: ${this.apiKey}`;
  }
}
```
__Controlador AppController para exponer la variable:__

```

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
  ```

__Arrancar la aplicación en modo desarrollo:__

```
npm run start:dev

```


__Arrancar la aplicación en modo producción (powershell)__

```
$env:NODE_ENV="prod"
npm run start:dev

```


# 15/10 configuración de entornos

__instalar las dependencias @nestjs/config__ 

```

npm install @nestjs/config 

```

importar el ConfigModule en el módulo principal de tu aplicación.

- .prod.env
- .test.env
- .env.model

- validación de variables de entorno

## VALIDACION DE VARIABLES DE ENTORNO CON JOI 

- Joi es una biblioteca utilizada para la validación de datos. Permite definir esquemas de validación para asegurarse de que los datos recibidos en peticiones HTTP (como en un cuerpo de solicitud, parámetros o encabezados) cumplan con ciertas reglas y formatos antes de ser procesados.

__Ejemplo en variables de entorno:__

```
validationSchema:Joi.object({
        APIKEY: Joi.number().required(),
        DB_NAME:Joi.string().required(),
        DB_PORT: Joi.number().required(),
      })
    }),
```

## 18/10 DOCUMENTACIÓN CON SWAGGER

- npm install --save @nestjs/swagger swagger-ui-express

## 22/10 DOCKER - POSTGRE Y PG4ADMIN

__Iniciar los servicios con Docker Compose__

```
docker-compose up -d

```
__Esto iniciará tanto PostgreSQL como PgAdmin utilizando las imágenes definidas en el archivo docker-compose.yml__

__Acceder a PgAdmin__
- Una vez que los servicios estén levantados,  acceder a PgAdmin desde el navegador con el puerto definido en el yml.



__Iniciar sesión usando las credenciales definidas en el archivo yml__





## para cuando no funciona: 

docker ps

docker compose down

docker-compose logs pgadmin


__Reiniciar el contenedor pgAdmin: A veces, simplemente reiniciar el contenedor de pgAdmin puede resolver el problema__

docker-compose restart pgadmin


__direccion del servidor__
nest-ecommerce-apirest-postgres-1


## 25/10 TypeORM
- Instalación

```
npm install --save @nestjs/typeorm typeorm

```
__Importar typeorm en el databasemodule con las siguientes modificaciones__

```
import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';

const APIKEY = 'DEV-456';
const APIKEYPROD = 'PROD-12345';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'APIKEY',
      useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port,
        });
        client.connect((err) => {
          if (err) {
            console.error('connection error', err.stack);
          } else {
            console.log('connected to the database');
          }
        });
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['APIKEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}

```

 //falta agregar typeorm solo a esta entidad (pedido.entity.ts) más adelante definir las relaciónes