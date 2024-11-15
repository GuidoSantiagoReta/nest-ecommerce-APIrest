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
  ValidateIf
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

export class FilterProductDTO {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ required: false })
  readonly limit?: number;
  
  @IsOptional()
  @Min(0)
  @ApiProperty({ required: false })
  readonly offset?: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty({ required: false })
  readonly precioMinimo?: number;

  @ValidateIf((item) => item.precioMinimo !== undefined) // No es opcional si existe precioMinimo
  @IsPositive()
  @ApiProperty({ required: false })
  readonly precioMaximo?: number;
}
