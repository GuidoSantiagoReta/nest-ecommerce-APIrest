//el DTO permite leer los datos
import { IsNotEmpty, IsString, IsNumber, IsUrl, IsPositive, IsOptional, Min, ValidateIf } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

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

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export class FilterProductsDTO {
  @IsOptional() 
  @IsPositive() 
  limit: number;

  @IsOptional()
  @Min(0) 
  offset: number;

  @IsOptional()
  @Min(0)
  precioMinimo: number;

  @ValidateIf(o => o.precioMinimo !== undefined)
  @IsPositive()
  precioMaximo: number;
}

