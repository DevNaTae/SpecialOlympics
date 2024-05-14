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
import { AthleteService } from './athlete.service';
import { Athlete } from './athlete.interface';

@Controller('athlete')
export class AthleteController {
  constructor(private readonly athleteService: AthleteService) {}

  @Get()
  async findAll(): Promise<Athlete[]> {
    return this.athleteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Athlete> {
    return this.athleteService.findOne(id);
  }

  @Post()
  async create(@Body() athlete: Athlete): Promise<Athlete> {
    return this.athleteService.create(athlete);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() athlete: Athlete,
  ): Promise<Athlete> {
    return this.athleteService.update(id, athlete);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.athleteService.remove(id);
  }
}
