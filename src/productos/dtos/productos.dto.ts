import { IsNotEmpty,IsString, IsNumber,IsUrl, IsPositive,} from 'class-validator';
//import { PartialType, OmitType } from '@nestjs/mapped-types'; 
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
//el DTO permite leer los datos

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly nombre: string; // solo lectura

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly precio: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly origen: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export class RemoveProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly idProduct
  
}