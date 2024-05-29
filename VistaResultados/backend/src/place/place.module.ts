import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlaceSchema } from './place.interface';

@Module({
  imports: [
    PlaceModule,
    MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
