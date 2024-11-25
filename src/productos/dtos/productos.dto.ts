//el DTO permite leer los datos
import { IsNotEmpty, IsString, IsNumber, IsUrl, IsPositive, ValidateNested, IsOptional, Min, ValidateIf, IsMongoId } from 'class-validator';
import { ApiProperty, PartialType,  } from '@nestjs/swagger';


export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsUrl()
  @IsOptional()
  readonly imagen: string;
}

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

//Validar DTOs enbebidos
  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  readonly categoria: CreateCategoriaDto;

  //fabricante
  @IsNotEmpty() 
  @IsMongoId() 
  @ApiProperty() readonly fabricante: string;
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


