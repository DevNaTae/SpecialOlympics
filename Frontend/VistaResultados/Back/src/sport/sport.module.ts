import { Module } from '@nestjs/common';
import { SportController } from './sport.controller';
import { SportService } from './sport.service';
import { SportProviders } from './sport';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SportController],
  providers: [SportService, ...SportProviders],
})
export class SportModule {}
