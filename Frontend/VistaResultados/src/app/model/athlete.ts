import { Event } from '../model/event';

export interface Athlete {
  id?: number;
  dni?: string;
  name?: string;
  age?: number;
  gender?: string;
  sportsman_number?: string;
  birthday?: string;
  address?: string;
  img_url?: string;
  lodging_place?: string;
  activity?: Event[];
  state?: boolean;
}
