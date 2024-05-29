import { Body, Controller, Get, Post } from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { Athlete } from './athlete.interface';

@Controller('athlete')
export class AthleteController {
  constructor(private readonly athleteService: AthleteService) {}

  @Get()
  findAll() {
    return this.athleteService.findAll();
  }

  @Post()
  crearCancion(@Body() athleteDto: Athlete) {
    return this.athleteService.create(athleteDto);
  }
}
