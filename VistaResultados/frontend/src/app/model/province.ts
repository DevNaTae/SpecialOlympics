import { Award } from './award';

export interface Province {
  _id?: string;
  name: string;
  img_url: string;
  award: Award[];
}
