import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.interface';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    return this.eventRepository.findOne({ where: { id } });
  }

  async create(event: Event): Promise<Event> {
    return this.eventRepository.save(event);
  }

  async update(id: number, event: Event): Promise<Event> {
    const existingEvent = await this.findOne(id);
    Object.assign(existingEvent, event);
    return this.eventRepository.save(existingEvent);
  }

  async remove(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }
}