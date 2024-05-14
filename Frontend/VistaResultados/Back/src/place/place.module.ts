import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceProviders } from './place';
import { PlaceController } from './place.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [PlaceService, ...PlaceProviders],
  controllers: [PlaceController],
})
export class PlaceModule {}
