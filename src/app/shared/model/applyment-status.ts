export class ApplymentStatus {
  assessmentToken: string;
  studentToken: string;
  answers: { questionId: string, value: string }[];
}
