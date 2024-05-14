import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Athlete } from './athlete.interface';

@Injectable()
export class AthleteService {
  constructor(
    @InjectRepository(Athlete)
    private athleteRepository: Repository<Athlete>,
  ) {}

  async findAll(): Promise<Athlete[]> {
    return this.athleteRepository.find();
  }

  async findOne(id: number): Promise<Athlete> {
    return this.athleteRepository.findOne({ where: { id } });
  }

  async create(athlete: Athlete): Promise<Athlete> {
    return this.athleteRepository.save(athlete);
  }

  async update(id: number, athlete: Athlete): Promise<Athlete> {
    const existingAthlete = await this.findOne(id);
    Object.assign(existingAthlete, athlete);
    return this.athleteRepository.save(existingAthlete);
  }

  async remove(id: number): Promise<void> {
    await this.athleteRepository.delete(id);
  }
}
