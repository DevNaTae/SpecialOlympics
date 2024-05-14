import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Award } from './award.interface';

@Injectable()
export class AwardService {
  constructor(
    @InjectRepository(Award)
    private awardRepository: Repository<Award>,
  ) {}

  async findAll(): Promise<Award[]> {
    return this.awardRepository.find();
  }

  async findOne(id: number): Promise<Award> {
    return this.awardRepository.findOne({ where: { id } });
  }

  async create(award: Award): Promise<Award> {
    return this.awardRepository.save(award);
  }

  async update(id: number, award: Award): Promise<Award> {
    const existingAward = await this.findOne(id);
    Object.assign(existingAward, award);
    return this.awardRepository.save(existingAward);
  }

  async remove(id: number): Promise<void> {
    await this.awardRepository.delete(id);
  }
}
