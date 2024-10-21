import { IsNotEmpty, IsString, IsNumber, } from 'class-validator';
//import { PartialType, OmitType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

export class CreateOperadorDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly role: string;
}

export class UpdateOperadorDTO extends PartialType(CreateOperadorDTO) {}

export class RemoveProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly idProduct: string;

}