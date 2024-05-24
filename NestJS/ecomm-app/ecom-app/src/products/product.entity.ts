import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  product_name: string;

  @Column('text')
  @ApiProperty()
  product_description: string;

  @Column()
  @ApiProperty()
  category_id: number;

  @Column('decimal')
  @ApiProperty()
  price: number;

  @Column()
  @ApiProperty()
  created_at: Date;
}
