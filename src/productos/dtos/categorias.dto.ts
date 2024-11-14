import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nombre de la categoría',
  })
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Imagen de la categoría',
  })
  readonly imagen: string;
}

export class UpdateCategoriaDto {
  @IsString()
  @ApiProperty({
    description: 'Nombre de la categoría',
    required: false,
  })
  readonly nombre?: string;

  @IsString()
  @ApiProperty({
    description: 'Imagen de la categoría',
    required: false,
  })
  readonly imagen?: string;
}
