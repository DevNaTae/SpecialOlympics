import { DataSource } from 'typeorm';
import { Result } from './result.interface';

export const ResultProviders = [
  {
    provide: 'ResultRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Result),
    inject: ['DATA_SOURCE'],
  },
];
