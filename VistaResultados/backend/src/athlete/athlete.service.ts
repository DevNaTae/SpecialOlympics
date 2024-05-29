import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Athlete, AthleteDocument } from './athlete.interface';
import { Model } from 'mongoose';

@Injectable()
export class AthleteService {
  constructor(
    @InjectModel(Athlete.name)
    private readonly athleteModel: Model<AthleteDocument>,
  ) {}

  async findAll(): Promise<Athlete[]> {
    return this.athleteModel
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

  async create(athleteDto: Athlete): Promise<Athlete> {
    const createdAthlete = new this.athleteModel(athleteDto);
    return createdAthlete.save();
  }
}
