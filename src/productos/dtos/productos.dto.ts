import { IsNotEmpty,IsString, IsNumber,IsUrl, IsPositive,} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types'; 
//el DTO permite leer los datos

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string; //solo lectura

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;

    @IsNumber()
    @IsPositive()
    readonly precio: number;

    @IsNumber()
    @IsPositive()
    readonly stock: number;

    @IsString()
    @IsNotEmpty()
    readonly origen: string;

    @IsUrl()
    @IsNotEmpty()
    readonly imagen: string;
  }
  //permite actualizar todos los campos del producto 
  export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

// Eliminar producto
  export class RemoveProductDTO {
    @IsString()
    @IsNotEmpty()
    readonly idProduct: string; 
  }
  

{/*
  export class UpdateProductDTO {
    readonly nombre?: string; //atributo de forma opcional
    readonly descripcion?: string;
    readonly precio?: number;
    readonly stock?: number;
    readonly origen?: string;
    readonly imagen?: string;
  }*/}