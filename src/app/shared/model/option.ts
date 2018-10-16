export class Option {
  id: number;
  text: string;

  constructor({ id = 0, text = '' } = {}) {
    this.id = id;
    this.text = text;
  }
}
