import {Answer} from './answer';

export interface Question {
  id: number;
  answers: Answer[];
}
