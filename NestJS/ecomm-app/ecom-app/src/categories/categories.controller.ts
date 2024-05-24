
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'The category has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of categories' })
  @ApiResponse({ status: 200, description: 'Return all categories.' })
  findAll(@Query() query: any) {
    return this.categoriesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiResponse({ status: 200, description: 'Return the category by ID.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update category by ID' })
  @ApiResponse({ status: 200, description: 'The category has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category by ID' })
  @ApiResponse({ status: 200, description: 'The category has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
