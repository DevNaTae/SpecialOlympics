import { DataSource } from 'typeorm';
import { SportCategory } from './sport_category.interface';

export const SportCategoryProviders = [
  {
    provide: 'SportCategoryRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SportCategory),
    inject: ['DATA_SOURCE'],
  },
];