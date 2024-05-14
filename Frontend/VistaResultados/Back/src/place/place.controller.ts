import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PlaceService } from './place.service';
import { Place } from './place.interface';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  async findAll(): Promise<Place[]> {
    return this.placeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Place> {
    return this.placeService.findOne(id);
  }

  @Post()
  async create(@Body() place: Place): Promise<Place> {
    return this.placeService.create(place);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() place: Place): Promise<Place> {
    return this.placeService.update(id, place);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.placeService.remove(id);
  }
}