import { Module } from '@nestjs/common';
import { CalendarProviders } from './calendar';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...CalendarProviders, CalendarService],
  controllers: [CalendarController],
})
export class CalendarModule {}
