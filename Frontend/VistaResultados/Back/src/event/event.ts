import { DataSource } from 'typeorm';
import { Event } from './event.interface';

export const EventProviders = [
  {
    provide: 'EventRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Event),
    inject: ['DATA_SOURCE'],
  },
];
