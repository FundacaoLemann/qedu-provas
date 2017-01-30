import { Question } from './question';

export class Assessment {
  id: number;
	uuid: string;
	main_title: string;
	instructions: string;
	description: string;
	duration: number;
	items_count: number;
  questions?: Question[];
}
