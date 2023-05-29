import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RootEntity } from 'src/common/root-entity';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  readonly customerId: RootEntity['id'];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
