import { Answer } from './answer';
import { Media } from './media';

export class Question {
  id: number;
  text: string;
  answers: Answer[];
  media: Media[];
}
