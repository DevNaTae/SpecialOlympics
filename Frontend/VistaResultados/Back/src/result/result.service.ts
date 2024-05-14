import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './result.interface';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
  ) {}

  async findAll(): Promise<Result[]> {
    return this.resultRepository.find();
  }

  async findOne(id: number): Promise<Result> {
    return this.resultRepository.findOne({ where: { id } });
  }

  async create(result: Result): Promise<Result> {
    return this.resultRepository.save(result);
  }

  async update(id: number, result: Result): Promise<Result> {
    const existingResult = await this.findOne(id);
    Object.assign(existingResult, result);
    return this.resultRepository.save(existingResult);
  }

  async remove(id: number): Promise<void> {
    await this.resultRepository.delete(id);
  }
}
