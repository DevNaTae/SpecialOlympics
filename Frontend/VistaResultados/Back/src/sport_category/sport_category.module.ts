import { Module } from '@nestjs/common';
import { SportCategoryController } from './sport_category.controller';
import { SportCategoryService } from './sport_category.service';
import { SportCategoryProviders } from './sport_category';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SportCategoryController],
  providers: [SportCategoryService, ...SportCategoryProviders],
})
export class SportCategoryModule {}
