import { inject, TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

describe('StoreService', () => {
  const initialState = {
    student: {
      name: 'John Doe',
      matricula: 12345,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreService],
    });
  });

  it(
    'should set new state',
    inject([StoreService], (store: StoreService) => {
      store.setState(initialState);
      expect(store.state).toEqual(initialState);
    }),
  );

  it(
    'should not allow update of an existing state',
    inject([StoreService], (store: StoreService) => {
      store.setState(initialState);
      const newState = store.state;
      newState.student.name = 'John';

      expect(() => {
        store.setState(newState);
      }).toThrowError(
        'Cannot modify an existing state. Please create a new state object.',
      );
    }),
  );

  it(
    'should update the state with a new state object',
    inject([StoreService], (store: StoreService) => {
      store.setState(initialState);
      const newState = _.merge({}, store.state, { student: { name: 'John' } });

      store.setState(newState);

      expect(store.state).toEqual(newState);
    }),
  );

  it(
    'should get the store as an observable',
    async(
      inject([StoreService], (store: StoreService) => {
        expect(store.asObservable()).toEqual(jasmine.any(Observable));
      }),
    ),
  );

  it(
    'should emit when a new state is set',
    async(
      inject([StoreService], (store: StoreService) => {
        const newState = { text: 'Yuck, well.' };
        const states = [];

        store.asObservable().subscribe(state => {
          states.push(state);
        });

        store.setState(newState);

        expect(states).toEqual([null, newState]);
      }),
    ),
  );
});
