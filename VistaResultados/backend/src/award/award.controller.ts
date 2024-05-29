import { Body, Controller, Get, Post } from '@nestjs/common';
import { AwardService } from './award.service';
import { Award } from './award.interface';

@Controller('award')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @Get()
  findAll() {
    return this.awardService.findAll();
  }

  @Post()
  crearCancion(@Body() awardDto: Award) {
    return this.awardService.create(awardDto);
  }
}
