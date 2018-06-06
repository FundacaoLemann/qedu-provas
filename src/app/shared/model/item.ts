import { Option } from './option';
import { Media } from './media';

export class Item {
  id: string;
  text: string;
  answers: Option[];
  media: Media[];

  constructor({ id = '', text = '', answers = [], media = [] } = {}) {
    this.id = id;
    this.text = text;
    this.answers = answers;
    this.media = media;
  }
}
