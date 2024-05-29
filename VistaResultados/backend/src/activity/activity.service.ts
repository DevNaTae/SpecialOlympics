import { Injectable } from '@nestjs/common';
import { Activity, ActivityDocument } from './activity.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name)
    private readonly activityModel: Model<ActivityDocument>,
  ) {}

  async findAll(): Promise<Activity[]> {
    return this.activityModel
      .find()
      .populate({
        path: 'SportCategory',
        populate: {
          path: 'sport',
          model: 'Sport',
        },
      })
      .exec();
  }

  async create(activityDto: Activity): Promise<Activity> {
    const createdActivity = new this.activityModel(activityDto);
    return createdActivity.save();
  }
}
