import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RootEntity } from './../../../common/root-entity';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: `user's email` })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly role: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty()
  readonly customer_id: RootEntity['id'];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
