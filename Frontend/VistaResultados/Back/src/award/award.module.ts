import { Module } from '@nestjs/common';
import { AwardService } from './award.service';
import { AwardController } from './award.controller';
import { AwardProviders } from './award';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [AwardService, ...AwardProviders],
  controllers: [AwardController],
})
export class AwardModule {}
