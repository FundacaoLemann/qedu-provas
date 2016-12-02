/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StoreService } from './store.service';
import { Student } from "../../shared/model/student";

describe('StoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreService]
    });
  });

  it('should set data', inject([StoreService], (service: StoreService) => {
    let student = new Student('John Doe', '332441');
    service.setStudent(student);
  }));
});
