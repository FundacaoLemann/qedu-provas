import { Option } from './option';
import { Media } from './media';

export class Question {
  id: number;
  text: string;
  answers: Option[];
  media: Media[];
}
