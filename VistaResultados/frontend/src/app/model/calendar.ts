import { Activity } from './activity';
import { Place } from './place';

export interface Calendar {
  _id?: number;
  date?: string;
  time?: string;
  place?: Place;
  activity?: Activity;
  state?: boolean;
}
