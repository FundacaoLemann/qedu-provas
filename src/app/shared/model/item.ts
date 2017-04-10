import { Option } from './option';
import { Media } from './media';

export class Item {
  id: string;
  text: string;
  answers: Option[];
  media: Media[];
}
