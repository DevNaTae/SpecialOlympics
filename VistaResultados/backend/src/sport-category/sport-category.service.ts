import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SportCategory } from './sport-category.interface';
import { Model } from 'mongoose';

@Injectable()
export class SportCategoryService {
  constructor(
    @InjectModel(SportCategory.name)
    private readonly sportCategoryModel: Model<SportCategory>,
  ) {}
  async findAll(): Promise<SportCategory[]> {
    return this.sportCategoryModel.find().populate('sport').exec();
  }

  async create(sportCategoryDto: SportCategory) {
    const newSC = await this.sportCategoryModel.create(sportCategoryDto);
    return newSC.save();
  }
}
