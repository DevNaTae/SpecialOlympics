import { SportCategory } from './sport-category';

export interface Activity {
  _id?: string;
  type?: string;
  gender?: string;
  SportCategory?: SportCategory;
  state?: boolean;
}
