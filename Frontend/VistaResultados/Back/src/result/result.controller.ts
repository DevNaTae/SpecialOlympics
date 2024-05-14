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
import { ResultService } from './result.service';
import { Result } from './result.interface';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get()
  async findAll(): Promise<Result[]> {
    return this.resultService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Result> {
    return this.resultService.findOne(id);
  }

  @Post()
  async create(@Body() result: Result): Promise<Result> {
    return this.resultService.create(result);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() result: Result,
  ): Promise<Result> {
    return this.resultService.update(id, result);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.resultService.remove(id);
  }
}
