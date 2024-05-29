import { Module } from '@nestjs/common';
import { AwardController } from './award.controller';
import { AwardService } from './award.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Result, ResultSchema } from 'src/result/result.interface';
import { Award, AwardSchema } from './award.interface';
import { Sport, SportSchema } from 'src/sport/sport.interface';

@Module({
  imports: [
    AwardModule,
    MongooseModule.forFeature([{ name: Award.name, schema: AwardSchema }]),
    MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]),
  ],
  controllers: [AwardController],
  providers: [AwardService],
})
export class AwardModule {}
