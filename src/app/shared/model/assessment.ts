import EducationalEntity from './educational-entity';
export class Assessment {
  id: number;
  token: string;
  mainTitle: string;
  secondaryTitle: string;
  instructions: string;
  description: string;
  duration: number;
  numberOfItems: number;
  subjects?: string[];
  school?: EducationalEntity;
  department?: EducationalEntity;
}
