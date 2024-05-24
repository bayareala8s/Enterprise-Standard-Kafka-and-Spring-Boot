import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryDto } from './dto/query.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  async findAll(@Query() query: QueryDto) {
    return await this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Return a single product.' })
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }
}
