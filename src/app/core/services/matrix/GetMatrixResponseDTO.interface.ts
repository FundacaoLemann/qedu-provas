export interface GetMatrixResponseDTO {
  data: {
    id: string;
    title: string;
    numberOfItems: number;
    grade: number;
    subjects: string[];
    items: Array<{
      id: string;
      stem: string;
      image: string;
      options: Array<{
        id: number;
        description: string;
      }>;
    }>;
  };
}
