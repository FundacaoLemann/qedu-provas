import { TestBed, async, inject } from '@angular/core/testing';
import { StudentService } from './student.service';
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

const db = require('../../../../mock/db.json');
const RAW_STUDENT = db.students[0];
const PARSED_STUDENT = {
  'id': '58d2f1af4a083c00194437c6',
  'matricula': '11223344',
  'name': 'Mario Junior Oliveira',
  'class': '901A'
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

  it('should return a parsed student', async(inject([
    StudentService,
    MockBackend
  ], (service: StudentService, mockBackend: MockBackend) => {

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: JSON.stringify({ data: RAW_STUDENT })
      })));
    });

    const expected = (student) => {
      expect(student).toEqual(PARSED_STUDENT);
    };

    service.getStudentByToken('1234', '321')
           .subscribe(expected);

  })));
});
