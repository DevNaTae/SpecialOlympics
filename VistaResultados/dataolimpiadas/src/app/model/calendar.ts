import { Place } from './place';
import { Sport } from './sport';

export interface Calendar {
  _id?: number;
  date?: string;
  time?: string;
  place?: Place;
  sport?: Sport;
  state?: boolean;
}
