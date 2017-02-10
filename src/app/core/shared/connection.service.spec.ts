import { TestBed, async, inject, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { ConnectionService } from './connection.service';
import { BaseRequestOptions, Http, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs';

describe('ConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConnectionService,
        {
          provide: Http,
          useFactory: (mockBackend, options) => new Http(mockBackend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ],
    });
  });

  it('smoke test', inject([ConnectionService], (service: ConnectionService) => {
    expect(service).toBeTruthy();
  }));

  it('get status of the connection once', async(
    inject([ConnectionService, MockBackend],
      (service: ConnectionService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: null,
            status: 0
          })));
        });

        expect(service.getStatusOnce).toBeDefined();
        service.getStatusOnce().subscribe(status => {
          expect(status).toEqual(true);
        });
      })
  ));

  it('should return observable of status', async(
    inject([ConnectionService],
      (connection: ConnectionService) => {
        expect(connection.status).toEqual(jasmine.any(Observable));
      }
    )
  ));

  it('should start to watch status and emit values', fakeAsync(
    inject(
      [ConnectionService],
      (connection: ConnectionService) => {
        spyOn(connection, 'getStatusOnce').and.returnValues(Observable.of(true), Observable.of(false), Observable.of(true));

        const statuses = [];
        connection
          .startWatch(100, 3)
          .subscribe(status => {
            statuses.push(status);
            if ( statuses.length === 3 ) {
              expect(statuses).toEqual([true, false, true]);
            }
          });
        tick(500);
      }
    )
  ));

  it('should stop watching when reach limit', fakeAsync(
    inject(
      [ConnectionService],
      (connection: ConnectionService) => {
        spyOn(connection, 'getStatusOnce').and.returnValues(Observable.of(true), Observable.of(false), Observable.of(true));

        connection.startWatch(100, 3);
        tick(500);

        expect(connection.isFetching).toEqual(false);
      }
    )
  ));

  it('should throw an error when already watching', fakeAsync(
    inject(
      [ConnectionService],
      (connection: ConnectionService) => {
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
          connection.startWatch(500)
        }).toThrow();

        discardPeriodicTasks();
      })
    )
  );

  it('should stop watching and reset values', fakeAsync(
    inject(
      [ConnectionService],
      (connection: ConnectionService) => {
        connection.startWatch(100);
        tick(101);
        discardPeriodicTasks();

        connection.stopWatch();
        expect(connection.isFetching).toBe(false);
      })
    )
  );

});

