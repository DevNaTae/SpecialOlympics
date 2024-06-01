import { Injectable } from '@nestjs/common';
import { Calendar, CalendarDocument } from './calendar.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Calendar.name)
    private readonly calendarModel: Model<CalendarDocument>,
  ) {}
  async findAll(): Promise<Calendar[]> {
    return this.calendarModel.find().populate('place').populate('sport').exec();
  }

  async create(calendarDto: Calendar): Promise<Calendar> {
    const createdcalendar = new this.calendarModel(calendarDto);
    return createdcalendar.save();
  }
}
