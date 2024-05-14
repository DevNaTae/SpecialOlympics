import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Athlete } from '../athlete/athlete.interface';
import { Calendar } from '../calendar/calendar.interface';

@Entity('result')
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  state: boolean;

  @Column()
  type: string;

  @ManyToOne(() => Calendar, (calendar) => calendar.result)
  calendar: Calendar;

  @ManyToOne(() => Athlete, (athlete) => athlete.result)
  athlete: Athlete;
}
