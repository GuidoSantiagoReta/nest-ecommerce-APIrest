import { IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateDetallePedidoDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly pedidoId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly productoId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly cantidad: number;
}

export class UpdateDetallePedidoDto extends PartialType(CreateDetallePedidoDto) {}
