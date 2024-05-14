import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SportCategory } from '../sport_category/sport_category.interface';

@Entity('sport')
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  icon: string;

  @Column({ default: true })
  state: boolean;

  @OneToMany(() => SportCategory, (sportCategory) => sportCategory.sport)
  sport_category: SportCategory[];
}
