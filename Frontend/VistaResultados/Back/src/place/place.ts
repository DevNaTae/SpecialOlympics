import { DataSource } from 'typeorm';
import { Place } from './place.interface';

export const PlaceProviders = [
  {
    provide: 'PlaceRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Place),
    inject: ['DATA_SOURCE'],
  },
];
