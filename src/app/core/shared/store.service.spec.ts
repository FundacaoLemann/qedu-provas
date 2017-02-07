import { inject, TestBed } from '@angular/core/testing';
import { StoreService } from './store.service';
import { Observable } from 'rxjs/Observable';

describe('StoreService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreService]
    });
  });

  it('should hold data', inject([StoreService], (store: StoreService) => {
    const student = { name: 'John Doe', matricula: '12345' };
    store.setValue('student', student);
    expect(store.getValue('student')).toEqual(student);
  }));

  it('should return an observable of answers', inject([StoreService], (store: StoreService) => {
    expect(store.answers).toEqual(jasmine.any(Observable));
  }));

});
