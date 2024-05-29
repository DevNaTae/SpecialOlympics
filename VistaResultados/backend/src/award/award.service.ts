import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Award } from './award.interface';
import { Model } from 'mongoose';

@Injectable()
export class AwardService {
  constructor(
    @InjectModel(Award.name) private readonly awardModel: Model<Award>,
  ) {}

  async create(createawardDto: Award): Promise<Award> {
    const createdaward = new this.awardModel(createawardDto);
    return createdaward.save();
  }

  async findAll(): Promise<Award[]> {
    return this.awardModel
      .find()
      .populate({
        path: 'result',
        populate: {
          path: 'athlete',
          model: 'Athlete',
          populate: {
            path: 'SportCategory',
            model: 'SportCategory',
            populate: {
              path: 'sport',
              model: 'Sport',
            },
          },
        },
      })
      .populate({
        path: 'result',
        populate: {
          path: 'calendar',
          model: 'Calendar',
          populate: {
            path: 'place',
            model: 'Place',
          },
        },
      })
      .populate({
        path: 'result',
        populate: {
          path: 'calendar',
          model: 'Calendar',
          populate: {
            path: 'activity',
            model: 'Activity',
          },
        },
      })
      .exec();
  }
}
