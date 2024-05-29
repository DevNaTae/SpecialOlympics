import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { PlaceModule } from 'src/place/place.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Province, ProvinceSchema } from './province.interface';
import { Award, AwardSchema } from 'src/award/award.interface';

@Module({
  imports: [
    PlaceModule,
    MongooseModule.forFeature([
      { name: Province.name, schema: ProvinceSchema },
      { name: Award.name, schema: AwardSchema },
    ]),
  ],
  providers: [ProvinceService],
  controllers: [ProvinceController],
})
export class ProvinceModule {}
