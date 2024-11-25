import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddProductsToOrderDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly productsIds: string[];
}
