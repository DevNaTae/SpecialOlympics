import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './activity.interface';
import {
  SportCategory,
  SportCategorySchema,
} from 'src/sport-category/sport-category.interface';

@Module({
  imports: [
    ActivityModule,
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
      { name: SportCategory.name, schema: SportCategorySchema },
    ]),
  ],
  providers: [ActivityService],
  controllers: [ActivityController],
})
export class ActivityModule {}
