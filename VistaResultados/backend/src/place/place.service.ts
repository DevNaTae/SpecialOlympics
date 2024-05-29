import { Injectable } from '@nestjs/common';
import { Place, PlaceDocument } from './place.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel(Place.name)
    private readonly PlaceModel: Model<PlaceDocument>,
  ) {}

  async findAll(): Promise<Place[]> {
    return this.PlaceModel.find().exec();
  }

  async create(PlaceDto: Place): Promise<Place> {
    const createdPlace = new this.PlaceModel(PlaceDto);
    return createdPlace.save();
  }
}
