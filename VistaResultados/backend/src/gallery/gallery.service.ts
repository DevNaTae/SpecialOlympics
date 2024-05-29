import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gallery, GalleryDocument } from './gallery.interface';
import { Model } from 'mongoose';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name)
    private readonly galleryModel: Model<GalleryDocument>,
  ) {}

  async findAll(): Promise<Gallery[]> {
    return this.galleryModel.find().exec();
  }

  async create(galleryDto: Gallery): Promise<Gallery> {
    const createdPlace = new this.galleryModel(galleryDto);
    return createdPlace.save();
  }
}
