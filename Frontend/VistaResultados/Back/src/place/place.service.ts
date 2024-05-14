import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './place.interface';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
  ) {}

  async findAll(): Promise<Place[]> {
    return this.placeRepository.find();
  }

  async findOne(id: number): Promise<Place> {
    return this.placeRepository.findOne({ where: { id } });
  }

  async create(place: Place): Promise<Place> {
    return this.placeRepository.save(place);
  }

  async update(id: number, place: Place): Promise<Place> {
    const existingPlace = await this.findOne(id);
    Object.assign(existingPlace, place);
    return this.placeRepository.save(existingPlace);
  }

  async remove(id: number): Promise<void> {
    await this.placeRepository.delete(id);
  }
}
