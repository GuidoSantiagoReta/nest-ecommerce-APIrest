import { IsNotEmpty, IsArray, IsDateString, IsMongoId, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePedidoDto {
  @IsDateString()
  @IsNotEmpty()
  readonly date: string;  

  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  @ApiProperty()
  readonly products: string[];

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  readonly operador: string;
}

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {}


