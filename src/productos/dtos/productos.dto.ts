import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

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

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly fabricanteId: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  readonly categoriasIds: number[];
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export class RemoveProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly idProduct: string;
}

export class FilterProductDTO {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
