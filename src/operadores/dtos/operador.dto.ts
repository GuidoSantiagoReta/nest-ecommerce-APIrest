import { IsNotEmpty, IsString, IsNumber, } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class CreateOperadorDTO {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;
}

export class UpdateOperadorDTO extends PartialType(CreateOperadorDTO) {}

export class RemoveProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly idProduct: string;
}
