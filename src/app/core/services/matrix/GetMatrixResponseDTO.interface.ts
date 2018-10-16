export interface GetMatrixResponseDTO {
  data: {
    id: string;
    title: string;
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
