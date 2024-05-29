import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Calendar, CalendarSchema } from './calendar.interface';
import { Place, PlaceSchema } from 'src/place/place.interface';
import { Activity, ActivitySchema } from 'src/activity/activity.interface';

@Module({
  imports: [
    CalendarModule,
    MongooseModule.forFeature([
      { name: Calendar.name, schema: CalendarSchema },
      { name: Place.name, schema: PlaceSchema },
      { name: Activity.name, schema: ActivitySchema },
    ]),
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
