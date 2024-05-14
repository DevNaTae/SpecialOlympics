import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Result } from '../result/result.interface';

@Entity('athlete')
export class Athlete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dni: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  sportsman_number: string;

  @Column()
  birthday: string;

  @Column()
  address: string;

  @Column()
  img_url: string;

  @Column()
  lodging_place: string;

  @Column()
  state: boolean;

  @OneToMany(() => Result, (result) => result.athlete)
  result: Result[];
}
