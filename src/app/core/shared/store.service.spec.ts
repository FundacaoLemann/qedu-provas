import { inject, TestBed } from '@angular/core/testing';
import { StoreService } from './store.service';

describe('StoreService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreService]
    });
  });

  it('should hold data', inject([StoreService], (store: StoreService) => {
    const student = { name: 'John Doe', matricula: '12345' };
    store.setValue('getStudent', student);
    expect(store.getValue('getStudent')).toEqual(student);
  }));

});
