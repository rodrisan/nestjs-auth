import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RootEntity } from 'src/common/root-entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString({ message: 'We need a valid name' })
  @ApiProperty({ description: `Product's name` })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;

  @IsNotEmpty()
  @IsUrl({ require_protocol: true })
  @ApiProperty()
  readonly image: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  readonly brand_id: RootEntity['id'];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
