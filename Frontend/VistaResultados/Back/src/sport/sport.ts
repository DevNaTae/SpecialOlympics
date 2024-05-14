import { DataSource } from 'typeorm';
import { Sport } from './sport.interface';

export const SportProviders = [
  {
    provide: 'SportRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Sport),
    inject: ['DATA_SOURCE'],
  },
];
