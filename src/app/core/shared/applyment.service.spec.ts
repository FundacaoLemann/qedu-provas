/* tslint:disable:no-unused-variable */
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
    let student = {
      name: 'John Doe',
      register_number: '12345'
    };
    service.setStudent(student);
    expect(service.getStudent()).toEqual(student);
  }));

});
