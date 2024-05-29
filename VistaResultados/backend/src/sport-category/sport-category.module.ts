import { Module } from '@nestjs/common';
import { SportCategoryService } from './sport-category.service';
import { SportCategoryController } from './sport-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SportCategory, SportCategorySchema } from './sport-category.interface';

@Module({
  imports: [
    SportCategoryModule,
    MongooseModule.forFeature([
      { name: SportCategory.name, schema: SportCategorySchema },
    ]),
  ],
  controllers: [SportCategoryController],
  providers: [SportCategoryService],
})
export class SportCategoryModule {}
