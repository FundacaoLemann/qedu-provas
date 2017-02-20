import { TestBed, inject } from '@angular/core/testing';
import { ApplymentService } from './applyment.service';
import { StoreService } from './store.service';

describe('ApplymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApplymentService,
        StoreService
      ]
    });
  });

  it('should load', inject([ApplymentService], (service: ApplymentService) => {
    expect(service).toBeTruthy();
  }));

  it('should hold student data', inject([ApplymentService], (service: ApplymentService) => {
    const student = {
      name: 'John Doe',
      matricula: '12345',
      class: ''
    };

    service.setStudent(student);
    expect(service.student()).toEqual(student);
  }));

  it('should initialize the answers store', inject([ApplymentService], (service: ApplymentService) => {
    expect(service.initAnswers).toBeDefined();
    service.initAnswers(10);

    const answers = service.getAnswers();
    expect(answers.length).toEqual(10);
    for (const answer of answers) {
      expect(answer).toEqual(0);
    }
  }));

});
