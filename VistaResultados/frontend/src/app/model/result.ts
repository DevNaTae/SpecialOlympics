import { Athlete } from './athlete';
import { Calendar } from './calendar';

export interface Result {
  _id?: number;
  place?: string;
  time?: string;
  athlete?: Athlete;
  calendar?: Calendar;
  state?: boolean;
}
