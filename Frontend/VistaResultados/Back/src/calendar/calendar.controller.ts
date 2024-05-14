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
import { CalendarService } from './calendar.service';
import { Calendar } from './calendar.interface';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  async findAll(): Promise<Calendar[]> {
    return this.calendarService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Calendar> {
    return this.calendarService.findOne(id);
  }

  @Post()
  async create(@Body() calendar: Calendar): Promise<Calendar> {
    return this.calendarService.create(calendar);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() calendar: Calendar,
  ): Promise<Calendar> {
    return this.calendarService.update(id, calendar);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.calendarService.remove(id);
  }
}
