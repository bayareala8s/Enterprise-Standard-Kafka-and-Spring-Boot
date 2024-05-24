// src/user/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {

  
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  fullname: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ApiProperty()
  @Column('simple-array', { nullable: true })
  orders: string[];

  @ApiProperty()
  @Column('simple-array', { nullable: true })
  wishLists: string[];

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  hasShippingAddress: boolean;

  @ApiProperty()
  @Column({ type: 'json', nullable: true })
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    province: string;
    country: string;
    phone: string;
  };

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}