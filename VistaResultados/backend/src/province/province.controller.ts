import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { Province } from './province.interface';
import { addAwardDto } from './addaward.interface';

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

  @Patch(':id')
  async addAward(
    @Param('id') id: string,
    @Body() addAwardDto: addAwardDto,
  ): Promise<Province> {
    return this.provinceService.addAward(id, addAwardDto);
  }
}
