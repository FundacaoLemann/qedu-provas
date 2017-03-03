export class Assessment {
  id: number;
  token: string;
  mainTitle: string;
  instructions: string;
  description: string;
  duration: number;
  itemsCount: number;
  subjects?: string[];
  school?: { id: string, description: string, image: string };
  department?: { id: string, description: string, image: string };
}
