//el DTO permite leer los datos
import { IsNotEmpty, IsString, IsUrl, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nombre: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  readonly imagen: string;
}

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}
