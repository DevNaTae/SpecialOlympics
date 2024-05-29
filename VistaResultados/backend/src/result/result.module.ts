import { Module } from '@nestjs/common';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Result, ResultSchema } from './result.interface';
import {
  SportCategory,
  SportCategorySchema,
} from 'src/sport-category/sport-category.interface';
import { Athlete, AthleteSchema } from 'src/athlete/athlete.interface';
import { Calendar, CalendarSchema } from 'src/calendar/calendar.interface';
import { Sport, SportSchema } from 'src/sport/sport.interface';

@Module({
  imports: [
    ResultModule,

    MongooseModule.forFeature([
      { name: Sport.name, schema: SportSchema },
      { name: Result.name, schema: ResultSchema },
      { name: Athlete.name, schema: AthleteSchema },
      { name: Calendar.name, schema: CalendarSchema },
    ]),
  ],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
