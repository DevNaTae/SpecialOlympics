import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Calendar } from '../calendar/calendar.interface';
import { SportCategory } from '../sport_category/sport_category.interface';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sport: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  state: boolean;

  @ManyToOne(() => SportCategory, (sportCategory) => sportCategory.event)
  sport_category: SportCategory;

  @OneToMany(() => Calendar, (calendar) => calendar.event)
  calendar: Calendar[];
}
