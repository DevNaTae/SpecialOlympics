import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calendar } from './calendar.interface';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private calendarRepository: Repository<Calendar>,
  ) {}

  async findAll(): Promise<Calendar[]> {
    return this.calendarRepository.find();
  }

  async findOne(id: number): Promise<Calendar> {
    return this.calendarRepository.findOne({ where: { id } });
  }

  async create(calendar: Calendar): Promise<Calendar> {
    return this.calendarRepository.save(calendar);
  }

  async update(id: number, calendar: Calendar): Promise<Calendar> {
    const existingCalendar = await this.findOne(id);
    Object.assign(existingCalendar, calendar);
    return this.calendarRepository.save(existingCalendar);
  }

  async remove(id: number): Promise<void> {
    await this.calendarRepository.delete(id);
  }
}
