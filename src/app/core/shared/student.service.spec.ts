import { TestBed, async, inject } from '@angular/core/testing';
import { StudentService } from './student.service';
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import json from '../../utils/json';

const mockStudent = {
  id: '1234',
  access_token: '1234',
  name: 'John Doe',
  matricula: '98765'
};

describe('StudentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StudentService,
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

  it('should be truthy', inject([StudentService], (service: StudentService) => {
    expect(service).toBeTruthy();
  }));

  it('should return an getStudent', async(inject([
    StudentService,
    MockBackend
  ], (service: StudentService, mockBackend: MockBackend) => {

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify({ data: mockStudent })
      })));
    });

    service.getStudentByToken('1234').subscribe((student) => {
      expect(student).toEqual(json.camelizeObject(mockStudent));
    });
  })));

});
