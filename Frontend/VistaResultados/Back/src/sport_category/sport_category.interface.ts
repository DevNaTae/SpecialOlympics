import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Event } from '../event/event.interface';
import { Sport } from '../sport/sport.interface';

@Entity('sport_category')
export class SportCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  state: boolean;

  @ManyToOne(() => Sport, (sport) => sport.sport_category)
  sport: Sport;

  @OneToMany(() => Event, (event) => event.sport_category)
  event: Event[];
}
