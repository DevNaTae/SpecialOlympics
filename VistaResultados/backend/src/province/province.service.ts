import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, model } from 'mongoose';
import { Province } from './province.interface';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectModel(Province.name) private readonly ProvinceModel: Model<Province>,
  ) {}

  async create(createProvinceDto: Province): Promise<Province> {
    const createdProvince = new this.ProvinceModel(createProvinceDto);
    return createdProvince.save();
  }

  async findAll(): Promise<Province[]> {
    return this.ProvinceModel.find()
      .populate({
        path: 'award',
        populate: {
          path: 'result',
          model: 'Result',
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
        },
      })
      .populate({
        path: 'award',
        populate: {
          path: 'result',
          model: 'Result',
          populate: {
            path: 'calendar',
            model: 'Calendar',
            populate: {
              path: 'place',
              model: 'Place',
            },
          },
        },
      })
      .populate({
        path: 'award',
        populate: {
          path: 'result',
          model: 'Result',
          populate: {
            path: 'calendar',
            model: 'Calendar',
            populate: {
              path: 'activity',
              model: 'Activity',
              populate: {
                path: 'SportCategory',
                model: 'SportCategory',
                populate: {
                  path: 'sport',
                  model: 'Sport',
                },
              },
            },
          },
        },
      })
      .exec();
  }
}
