import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sport } from './sport.interface';

@Injectable()
export class SportService {
  constructor(
    @InjectModel(Sport.name) private readonly sportModel: Model<Sport>,
  ) {}

  async create(createSportDto: Sport): Promise<Sport> {
    const createdSport = new this.sportModel(createSportDto);
    return createdSport.save();
  }

  async findAll(): Promise<Sport[]> {
    return this.sportModel.find().exec();
  }
}
