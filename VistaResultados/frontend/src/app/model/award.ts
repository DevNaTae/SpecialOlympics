import { Result } from './result';

export interface Award {
  _id?: number;
  province?: string;
  result?: Result;
  type: string;
  state?: boolean;
}
