import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './activity.interface';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  findAll() {
    return this.activityService.findAll();
  }

  @Post()
  crearCancion(@Body() activityDto: Activity) {
    return this.activityService.create(activityDto);
  }
}
