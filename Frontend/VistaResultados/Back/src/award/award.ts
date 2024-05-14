import { DataSource } from 'typeorm';
import { Award } from './award.interface';

export const AwardProviders = [
  {
    provide: 'AwardRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Award),
    inject: ['DATA_SOURCE'],
  },
];
