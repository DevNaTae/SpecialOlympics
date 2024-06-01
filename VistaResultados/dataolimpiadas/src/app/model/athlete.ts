import { SportCategory } from './sport-category';

export interface Athlete {
  _id?: string;
  name?: string;
  dni?: string;
  age?: number;
  gender?: string;
  sportsman_number?: string;
  birthday?: string;
  address?: string;
  img_url?: string;
  lodging_place?: string;
  SportCategory?: SportCategory[];
  state?: boolean;
}
