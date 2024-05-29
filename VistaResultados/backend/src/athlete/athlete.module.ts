import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Athlete, AthleteSchema } from './athlete.interface';
import { AthleteController } from './athlete.controller';
import { AthleteService } from './athlete.service';
import {
  SportCategory,
  SportCategorySchema,
} from 'src/sport-category/sport-category.interface';

@Module({
  imports: [
    AthleteModule,
    MongooseModule.forFeature([
      { name: Athlete.name, schema: AthleteSchema },
      { name: SportCategory.name, schema: SportCategorySchema },
    ]),
  ],
  controllers: [AthleteController],
  providers: [AthleteService],
})
export class AthleteModule {}
