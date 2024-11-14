import { IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePedidoDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly compradorId: number;
}

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {}
