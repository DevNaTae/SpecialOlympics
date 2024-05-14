import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Event } from '../event/event.interface';
import { Place } from '../place/place.interface';
import { Result } from '../result/result.interface';

@Entity('calendar')
export class Calendar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  state: boolean;

  @ManyToOne(() => Event, (event) => event.calendar)
  event: Event;

  @ManyToOne(() => Place, (place) => place.calendar)
  place: Place;

  @OneToMany(() => Result, (result) => result.calendar)
  result: Result[];
}
