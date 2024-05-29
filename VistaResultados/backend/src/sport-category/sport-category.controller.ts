import { Body, Controller, Get, Post } from '@nestjs/common';
import { SportCategoryService } from './sport-category.service';
import { SportCategory } from './sport-category.interface';

@Controller('sport-category')
export class SportCategoryController {
  constructor(private readonly sportCategoryService: SportCategoryService) {}

  @Get()
  findAll() {
    return this.sportCategoryService.findAll();
  }

  @Post()
  crearCancion(@Body() sportCategoryDto: SportCategory) {
    return this.sportCategoryService.create(sportCategoryDto);
  }
}
