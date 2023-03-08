import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('user')
export class UserController {
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return 'TODO';
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return 'TODO';
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return 'TODO';
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return 'TODO';
  }
}
