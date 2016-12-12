import { Question } from './question';

export class Assessment {
  id: number;
	uuid: string;
	title: string;
	instructions: string;
	duration: number;
	items_count: number;
  questions?: Question[];
}
