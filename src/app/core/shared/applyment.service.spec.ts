/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { ApplymentService } from './applyment.service';

describe('ApplymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplymentService]
    });
  });

  it('should load', inject([ApplymentService], (service: ApplymentService) => {
    expect(service).toBeTruthy();
  }));

  it('should record start time of applyment', inject([ApplymentService], (service: ApplymentService) => {
    service.start();
    expect(service.startTime).toEqual(jasmine.any(Date));
  }));

  it('should record finish time of applyment', inject([ApplymentService], (service: ApplymentService) => {
    service.finish();
    expect(service.finishTime).toEqual(jasmine.any(Date));
  }));


  describe('question management', () => {
    let service: ApplymentService;

    beforeAll(() => {
      service = new ApplymentService();
    });

  });



});
