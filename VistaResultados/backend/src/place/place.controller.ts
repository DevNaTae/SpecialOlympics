import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlaceService } from './place.service';
import { Place } from './place.interface';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  findAll() {
    return this.placeService.findAll();
  }

  @Post()
  crearCancion(@Body() athleteDto: Place) {
    return this.placeService.create(athleteDto);
  }
}
