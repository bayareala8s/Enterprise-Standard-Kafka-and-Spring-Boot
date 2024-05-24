import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  product_name: string;

  @ApiProperty()
  product_description: string;

  @ApiProperty()
  category_id: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  created_at: Date;
}
