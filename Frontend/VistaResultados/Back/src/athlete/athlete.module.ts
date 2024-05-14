import { Module } from '@nestjs/common';
import { AthleteController } from './athlete.controller';
import { AthleteService } from './athlete.service';
import { AthleteProviders } from './athlete';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AthleteController],
  providers: [AthleteService, ...AthleteProviders],
})
export class AthleteModule {}
