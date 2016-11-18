import { Grade } from './grade';
import { Author } from './author';

export class Assessment {
	uuid: string;
	title: string;
	instructions: string;
	duration: number;
	grade: Grade[];
	author: Author;
	application_date: Date;
	version: number;
	items_count: number;
}