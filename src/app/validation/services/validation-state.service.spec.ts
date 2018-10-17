import { TestBed, inject } from '@angular/core/testing';

import { ValidationStateService } from './validation-state.service';

describe('ValidationStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationStateService]
    });
  });

  it('should be created', inject([ValidationStateService], (service: ValidationStateService) => {
    expect(service).toBeTruthy();
  }));
});
