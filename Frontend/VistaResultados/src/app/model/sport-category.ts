import { Sport } from './sport';

export interface SportCategory {
  id?: number;
  sport?: Sport;
  name?: string;
  description?: string;
  state?: boolean;
}
