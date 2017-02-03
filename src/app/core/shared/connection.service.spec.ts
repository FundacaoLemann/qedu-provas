import { TestBed, async, inject } from '@angular/core/testing';
import { ConnectionService } from './connection.service';
import { BaseRequestOptions, Http, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

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

  it('get status of the connection once', async(inject([ConnectionService, MockBackend], (service: ConnectionService, mockBackend: MockBackend) => {
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
  })));

});
