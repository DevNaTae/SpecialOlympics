import { DataSource } from 'typeorm';
import { Calendar } from './calendar.interface';

export const CalendarProviders = [
  {
    provide: 'CalendarRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Calendar),
    inject: ['DATA_SOURCE'],
  },
];