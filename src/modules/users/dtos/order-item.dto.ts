import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RootEntity } from 'src/common/root-entity';

export class CreateOrderItemDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  readonly orderId: RootEntity['id'];

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId: RootEntity['id'];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
