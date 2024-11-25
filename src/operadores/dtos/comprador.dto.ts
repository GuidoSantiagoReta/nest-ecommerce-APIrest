import { IsNotEmpty, IsString, IsEmail, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

class DireccionDto {
  @IsString()
  @IsNotEmpty()
  calle: string;

  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsString()
  @IsNotEmpty()
  ciudad: string;
}

export class CreateCompradorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DireccionDto)
  @IsNotEmpty()
  direcciones: DireccionDto[];
}

export class UpdateCompradorDto extends PartialType(CreateCompradorDto) {}
