import { Sport } from './sport';

export interface SportCategory {
  _id?: number;
  name?: string;
  description?: string;
  sport?: Sport;
  state?: boolean;
}
