import { Injectable } from '@nestjs/common';
import { Result } from './result.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result.name) private readonly resultModel: Model<Result>,
  ) {}

  async create(createResultDto: Result): Promise<Result> {
    const createdResult = new this.resultModel(createResultDto);
    return createdResult.save();
  }

  async findAll(): Promise<Result[]> {
    return this.resultModel
      .find()
      .populate({
        path: 'athlete',
        populate: {
          path: 'SportCategory',
          model: 'SportCategory',
          populate: {
            path: 'sport',
            model: 'Sport',
          },
        },
      })
      .populate({
        path: 'calendar',
        populate: {
          path: 'activity',
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
        path: 'calendar',
        populate: {
          path: 'place',
          model: 'Place',
        },
      })
      .exec();
  }
}
