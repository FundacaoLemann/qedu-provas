import { Item } from './item';

export class Matrix {
  id: string;
  title: string;
  numberOfItems: number;
  grade: number;
  subjects: string[];
  items: Item[];

  constructor({
    id = '',
    title = '',
    numberOfItems = 0,
    grade = 0,
    subjects = [],
    items = [],
  } = {}) {
    this.id = id;
    this.title = title;
    this.numberOfItems = numberOfItems;
    this.grade = grade;
    this.subjects = subjects;
    this.items = items;
  }
}
