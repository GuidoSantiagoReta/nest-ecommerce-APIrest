import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOperadorDTO {

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly role: string;
}

export class UpdateOperadorDTO extends PartialType(CreateOperadorDTO) {}

export class RemoveProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly idProduct: string;
}
