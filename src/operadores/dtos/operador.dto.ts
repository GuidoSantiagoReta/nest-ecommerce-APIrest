import { IsNotEmpty, IsString, IsNumber, IsOptional, } from 'class-validator';
//import { PartialType, OmitType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOperadorDTO {

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

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  readonly compradorId: number;
}

export class UpdateOperadorDTO extends PartialType(CreateOperadorDTO) {}

export class RemoveProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly idProduct: string;

}