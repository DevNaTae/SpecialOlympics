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
import { SportService } from './sport.service';
import { Sport } from './sport.interface';

@Controller('sport')
export class SportController {
  constructor(private readonly sportService: SportService) {}

  @Get()
  async findAll(): Promise<Sport[]> {
    return this.sportService.findAll();
  }

  @Get(':id') async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Sport> {
    return this.sportService.findOne(id);
  }

  @Post()
  async create(@Body() sport: Sport): Promise<Sport> {
    return this.sportService.create(sport);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() sport: Sport,
  ): Promise<Sport> {
    return this.sportService.update(id, sport);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sportService.remove(id);
  }
}
