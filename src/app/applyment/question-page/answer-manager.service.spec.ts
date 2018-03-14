import { TestBed, inject } from '@angular/core/testing';

import { AnswerManagerService } from './answer-manager.service';

describe('AnswerManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnswerManagerService]
    });
  });

  it('should be created', inject([AnswerManagerService], (service: AnswerManagerService) => {
    expect(service).toBeTruthy();
  }));
});
