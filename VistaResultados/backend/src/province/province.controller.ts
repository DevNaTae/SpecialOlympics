import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { Province } from './province.interface';

@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  findAll() {
    return this.provinceService.findAll();
  }

  @Post()
  crearCancion(@Body() athleteDto: Province) {
    return this.provinceService.create(athleteDto);
  }
}
