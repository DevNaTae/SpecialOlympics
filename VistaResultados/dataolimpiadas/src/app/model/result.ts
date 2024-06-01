import { Athlete } from './athlete';
import { Calendar } from './calendar';
import { SportCategory } from './sport-category';

export interface Result {
  _id?: number;
  value?: string;
  type?: string;
  athlete?: string;
  calendar?: Calendar;
  SportCategory?: SportCategory;
  state?: boolean;
}
