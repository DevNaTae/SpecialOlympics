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
import { AwardService } from './award.service';
import { Award } from './award.interface';

@Controller('award')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @Get()
  async findAll(): Promise<Award[]> {
    return this.awardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Award> {
    return this.awardService.findOne(id);
  }

  @Post()
  async create(@Body() award: Award): Promise<Award> {
    return this.awardService.create(award);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() award: Award,
  ): Promise<Award> {
    return this.awardService.update(id, award);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.awardService.remove(id);
  }
}
