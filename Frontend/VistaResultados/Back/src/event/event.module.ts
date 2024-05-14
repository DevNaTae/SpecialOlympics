import { Module } from '@nestjs/common';
import { EventProviders } from './event';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...EventProviders, EventService],
  controllers: [EventController],
})
export class EventModule {}
