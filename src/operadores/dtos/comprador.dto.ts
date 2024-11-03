import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCompradorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly apellido: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly telefono: string;
}

export class UpdateCompradorDto extends PartialType(CreateCompradorDto) {}