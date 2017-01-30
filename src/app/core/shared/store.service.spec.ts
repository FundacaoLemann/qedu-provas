/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';
import { StoreService } from './store.service';

describe('StoreService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreService]
    });
  });

  it('should hold data', inject([StoreService], (store: StoreService) => {
    let student = { name: 'John Doe', matricula: '12345' };
    store.setValue('student', student);
    expect(store.getValue('student')).toEqual(student);
  }));

});
