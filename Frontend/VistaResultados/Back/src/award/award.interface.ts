import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Place } from '../place/place.interface';

@Entity('award')
export class Award {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  place: number;

  @ManyToOne(() => Place, (place) => place.award)
  place_relation: Place;
}
