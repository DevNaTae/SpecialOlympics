import { Module } from '@nestjs/common';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';
import { ResultProviders } from './result';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ResultController],
  providers: [ResultService, ...ResultProviders],
})
export class ResultModule {}
