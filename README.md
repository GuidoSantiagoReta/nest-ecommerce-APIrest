# Proyecto Nest (API REST de Ecommerce)

## Objetivo
Desarrollar una aplicación que gestione diferentes entidades de un e-commerce a través de sus respectivos controladores.

## Componentes principales

__1. Controladores__
Clases responsables de manejar solicitudes HTTP entrantes y devolver respuestas.
Asociados a rutas específicas del sistema de enrutamiento de NestJS.
Modularizados y reutilizables.

__2. Servicios__
Clases que encapsulan la lógica de negocio.
Utilizan el principio de inyección de dependencias.
Contienen métodos para interactuar con bases de datos y realizar llamadas a APIs.

__3. Entidades__
Clases que definen los atributos y comportamientos de objetos específicos.
Ejemplo: producto.entity.ts

__4. DTOs (Data Transfer Objects)__
Máscaras para filtrar entradas de datos.
Validan la estructura y tipos de datos recibidos desde el cliente.
Protegen la API contra solicitudes malformadas o maliciosas.

__5. Bibliotecas adicionales__

@nestjs/mapped-types: Para crear tipos flexibles basados en otros tipos existentes.
class-validator: Para validar decoradores y validaciones en tiempo de ejecución.
class-transformer: Para facilitar la conversión entre diferentes formatos de datos.

## Implementación

Generación de controladores:

```
nest generate controller <nombre-del-controlador>

```
Creación de servicios:

```
nest generate service <nombre-del-servicio>

```
## Implementación de DTOs

```
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;
  //...
}

```
Uso de @nestjs/mapped-types para crear tipos flexibles:
```
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class UpdateProductDTO extends PartialType(OmitType(CreateProductDTO, ['nombre'])) {}

```
Validación y transformación de datos con class-validator y class-transformer.

## Pruebas
Para asegurar que las rutas y los datos funcionen correctamente, se utiliza Postman para probar cada uno de los endpoints de la API.
