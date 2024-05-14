import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportCategory } from './sport_category.interface';

@Injectable()
export class SportCategoryService {
  constructor(
    @InjectRepository(SportCategory)
    private sportCategoryRepository: Repository<SportCategory>,
  ) {}

  async findAll(): Promise<SportCategory[]> {
    return this.sportCategoryRepository.find();
  }

  async findOne(id: number): Promise<SportCategory> {
    return this.sportCategoryRepository.findOne({ where: { id } });
  }

  async create(sportCategory: SportCategory): Promise<SportCategory> {
    return this.sportCategoryRepository.save(sportCategory);
  }

  async update(
    id: number,
    sportCategory: SportCategory,
  ): Promise<SportCategory> {
    const existingSportCategory = await this.findOne(id);
    Object.assign(existingSportCategory, sportCategory);
    return this.sportCategoryRepository.save(existingSportCategory);
  }

  async remove(id: number): Promise<void> {
    await this.sportCategoryRepository.delete(id);
  }
}
