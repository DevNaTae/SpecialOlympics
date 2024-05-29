import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { SportController } from 'src/sport/sport.controller';
import { Sport, SportSchema } from './sport.interface';
import { SportService } from 'src/sport/sport.service';

@Module({
  imports: [
    SportModule,
    MongooseModule.forFeature([{ name: Sport.name, schema: SportSchema }]),
  ],
  controllers: [SportController],
  providers: [SportService],
})
export class SportModule {}
