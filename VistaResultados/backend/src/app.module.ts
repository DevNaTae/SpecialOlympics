import { MongooseModule } from '@nestjs/mongoose';
import { SportModule } from './sport/sport.module';
import { Module } from '@nestjs/common';
import { AthleteModule } from './athlete/athlete.module';
import { SportCategoryModule } from './sport-category/sport-category.module';
import { PlaceModule } from './place/place.module';
import { CalendarModule } from './calendar/calendar.module';
import { AwardModule } from './award/award.module';
import { ResultModule } from './result/result.module';
import { ProvinceModule } from './province/province.module';
import { ActivityModule } from './activity/activity.module';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://devnatae:123456As@cluster0.nkieuji.mongodb.net/specialolympics',
    ),
    SportModule,
    AthleteModule,
    SportCategoryModule,
    PlaceModule,
    CalendarModule,
    AwardModule,
    ResultModule,
    ProvinceModule,
    ActivityModule,
    GalleryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
