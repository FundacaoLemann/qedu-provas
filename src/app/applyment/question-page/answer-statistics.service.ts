import { Injectable } from '@angular/core';
import Answer from '../../shared/model/answer';

@Injectable()
export class AnswerStatisticsService {

  constructor() { }

  track(answer: Answer) {
  }

  getTrackAnswer(): Answer {
    return new Answer();
  }
}
