import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SportCategoryService } from './sport_category.service';
import { SportCategory } from './sport_category.interface';

@Controller('sport-category')
export class SportCategoryController {
  constructor(private readonly sportCategoryService: SportCategoryService) {}

  @Get()
  async findAll(): Promise<SportCategory[]> {
    return this.sportCategoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SportCategory> {
    return this.sportCategoryService.findOne(id);
  }

  @Post()
  async create(@Body() sportCategory: SportCategory): Promise<SportCategory> {
    return this.sportCategoryService.create(sportCategory);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() sportCategory: SportCategory,
  ): Promise<SportCategory> {
    return this.sportCategoryService.update(id, sportCategory);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sportCategoryService.remove(id);
  }
}
