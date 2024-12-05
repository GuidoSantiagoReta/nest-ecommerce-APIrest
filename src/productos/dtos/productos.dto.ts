import { IsNotEmpty, IsString, IsNumber, IsUrl, IsPositive, ValidateNested, IsOptional, Min, ValidateIf, IsMongoId, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSubDocDto } from './sub-doc.dto';

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
  @IsOptional()
  readonly imagen: string;

  // Validar DTOs embebidos (opcional)
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCategoriaDto)
  @ApiProperty()
  readonly categoria?: CreateCategoriaDto;

  // Fabricante referencial ( opcional)
  @IsOptional() 
  @IsMongoId() 
  @ApiProperty() 
  readonly fabricante?: string;

  // Subdocumento (opcional)
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSubDocDto)
  readonly subDoc?: CreateSubDocDto;

  // Array de subdocumentos ( opcional)
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubDocDto)
  readonly subDocs?: CreateSubDocDto[];
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

