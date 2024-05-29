import { Body, Controller, Get, Post } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { Calendar } from './calendar.interface';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  findAll() {
    return this.calendarService.findAll();
  }

  @Post()
  crearCancion(@Body() calendarDto: Calendar) {
    return this.calendarService.create(calendarDto);
  }
}
