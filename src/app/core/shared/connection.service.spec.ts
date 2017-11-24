import {
  TestBed,
  async,
  inject,
  fakeAsync,
  tick,
  discardPeriodicTasks,
} from '@angular/core/testing';
import { ConnectionService } from './connection.service';
import { Observable } from 'rxjs/Observable';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('ConnectionService', () => {
  const { API_URL } = environment;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConnectionService],
    });
  });

  it(
    'smoke test',
    inject([ConnectionService], (service: ConnectionService) => {
      expect(service).toBeTruthy();
    }),
  );

  it(
    'get status of the connection once',
    async(
      inject(
        [ConnectionService, HttpTestingController],
        (service: ConnectionService, mockHttp: HttpTestingController) => {
          service.getStatusOnce().subscribe(status => {
            expect(status).toEqual(true);
          });

          mockHttp.expectOne(`${API_URL}`).flush(null);
        },
      ),
    ),
  );

  it(
    'should return observable of status',
    async(
      inject([ConnectionService], (connection: ConnectionService) => {
        expect(connection.status).toEqual(jasmine.any(Observable));
      }),
    ),
  );

  it(
    'should start to watch status and emit values',
    fakeAsync(
      inject([ConnectionService], (connection: ConnectionService) => {
        spyOn(connection, 'getStatusOnce').and.returnValues(
          Observable.of(true),
          Observable.of(false),
          Observable.of(true),
        );

        const statuses = [];
        connection.startWatch(100, 3).subscribe(status => {
          statuses.push(status);
          if (statuses.length === 3) {
            expect(statuses).toEqual([true, false, true]);
          }
        });
        tick(500);
      }),
    ),
  );

  it(
    'should stop watching when reach limit',
    fakeAsync(
      inject([ConnectionService], (connection: ConnectionService) => {
        spyOn(connection, 'getStatusOnce').and.returnValues(
          Observable.of(true),
          Observable.of(false),
          Observable.of(true),
        );

        connection.startWatch(100, 3);
        tick(500);

        expect(connection.isFetching).toEqual(false);
      }),
    ),
  );

  it(
    'should throw an errors when already watching',
    fakeAsync(
      inject([ConnectionService], (connection: ConnectionService) => {
        spyOn(connection, 'getStatusOnce').and.returnValues(
          Observable.of(true),
          Observable.of(true),
          Observable.of(true),
          Observable.of(true),
          Observable.of(true),
          Observable.of(true),
        );

        connection.startWatch(100, 3);
        tick(100);

        expect(() => {
          connection.startWatch(500);
        }).toThrow();

        discardPeriodicTasks();
      }),
    ),
  );

  it(
    'should stop watching and reset values',
    fakeAsync(
      inject([ConnectionService], (connection: ConnectionService) => {
        connection.startWatch(100);
        tick(101);
        discardPeriodicTasks();

        connection.stopWatch();
        expect(connection.isFetching).toBe(false);
      }),
    ),
  );
});
