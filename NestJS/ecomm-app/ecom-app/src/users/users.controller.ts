// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from './users.service';
import { User } from './user.entity';

@ApiTags('users')
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: User })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad request.'})
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users', type: [User]})
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'The user details'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiBody({ type: User })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.'})
  @ApiResponse({ status: 400, description: 'Bad request.'})
  update(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
  return this.userService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}