import { Body, Controller, Get, Post } from '@nestjs/common';
import { Sport } from './sport.interface';

import { SportService } from 'src/sport/sport.service';

@Controller('sport')
export class SportController {
  constructor(private readonly sportService: SportService) {}

  @Get()
  findAll() {
    return this.sportService.findAll();
  }

  @Post()
  create(@Body() sportDto: Sport) {
    return this.sportService.create(sportDto);
  }
}
