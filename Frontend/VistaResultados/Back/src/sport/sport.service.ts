import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from './sport.interface';

@Injectable()
export class SportService {
  constructor(
    @InjectRepository(Sport)
    private sportRepository: Repository<Sport>,
  ) {}

  async findAll(): Promise<Sport[]> {
    return this.sportRepository.find();
  }

  async findOne(id: number): Promise<Sport> {
    return this.sportRepository.findOne({ where: { id } });
  }

  async create(sport: Sport): Promise<Sport> {
    return this.sportRepository.save(sport);
  }

  async update(id: number, sport: Sport): Promise<Sport> {
    const existingSport = await this.findOne(id);
    Object.assign(existingSport, sport);
    return this.sportRepository.save(existingSport);
  }

  async remove(id: number): Promise<void> {
    await this.sportRepository.delete(id);
  }
}
