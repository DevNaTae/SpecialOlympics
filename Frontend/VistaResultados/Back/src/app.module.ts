import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AthleteModule } from './athlete/athlete.module';
import { AwardModule } from './award/award.module';
import { EventModule } from './event/event.module';
import { PlaceModule } from './place/place.module';
import { ResultModule } from './result/result.module';
import { SportModule } from './sport/sport.module';
import { CalendarModule } from './calendar/calendar.module';
import { SportCategoryModule } from './sport_category/sport_category.module';

@Module({
  imports: [
    AthleteModule,
    AwardModule,
    EventModule,
    PlaceModule,
    ResultModule,
    SportModule,
    CalendarModule,
    SportCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
