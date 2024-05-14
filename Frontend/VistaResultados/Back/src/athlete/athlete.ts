import { DataSource } from 'typeorm';
import { Athlete } from './athlete.interface';

export const AthleteProviders = [
  {
    provide: 'AthleteRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Athlete),
    inject: ['DATA_SOURCE'],
  },
];