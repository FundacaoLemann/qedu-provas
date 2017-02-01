import { Question } from './question';

export class Assessment {
  id: number;
	uuid: string;
	mainTitle: string;
	instructions: string;
	description: string;
	duration: number;
	itemsCount: number;
  questions?: Question[];
}
