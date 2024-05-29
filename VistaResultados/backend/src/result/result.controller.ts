import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResultService } from './result.service';
import { Result } from './result.interface';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get()
  findAll() {
    return this.resultService.findAll();
  }

  @Post()
  create(@Body() resultDto: Result) {
    return this.resultService.create(resultDto);
  }
}
