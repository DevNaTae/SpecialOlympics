import { SportCategory } from './sport-category';

export interface Event {
  id?: number;
  name?: string;
  sport?: SportCategory;
  description?: string;
  state?: boolean;
}
