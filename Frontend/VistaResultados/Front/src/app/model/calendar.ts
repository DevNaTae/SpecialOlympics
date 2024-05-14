import { Place } from './place';

export interface Calendar {
  id?: number;
  event?: Event;
  place?: Place;
  date?: Date;
  state?: boolean;
}
