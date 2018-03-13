import { TestBed, inject } from '@angular/core/testing';

import { AnswerStatisticsService } from './answer-statistics.service';

describe('AnswerStatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnswerStatisticsService]
    });
  });

  it('should be created', inject([AnswerStatisticsService], (service: AnswerStatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
