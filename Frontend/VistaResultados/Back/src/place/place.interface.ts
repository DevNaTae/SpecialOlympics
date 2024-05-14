import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Award } from '../award/award.interface';
import { Calendar } from '../calendar/calendar.interface';

@Entity('place')
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('json')
  img_url: object;

  @Column()
  description: string;

  @Column()
  state: boolean;

  @OneToMany(() => Award, (award) => award.place)
  award: Award[];

  @OneToMany(() => Calendar, (calendar) => calendar.place)
  calendar: Calendar[];
}
