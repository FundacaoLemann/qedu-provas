import { TestBed, inject, async } from '@angular/core/testing';
import { AssessmentService } from './assessment.service';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

const mock = require('../../../../mock/db.json');
const ASSESSMENT = mock.assessments[0];
const QUESTIONS = mock.questions;


describe('AssessmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AssessmentService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
      ],
      imports: [HttpModule]
    });
  });

  it('should construct service', inject(
    [AssessmentService],
    (service: AssessmentService) => {

      expect(service).toBeTruthy();

    }
  ));

  describe('fetchAssessment()', () => {
    it('should return an Assessment', async(inject(
      [AssessmentService, MockBackend],
      (service: AssessmentService, mockBackend: MockBackend) => {

        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify({ data: ASSESSMENT }) })));
        });

        service.fetchAssessment('1')
          .subscribe(assessment =>
            expect(assessment).toEqual(ASSESSMENT)
          );

      }
    )));

  });

  describe('fetchAssessmentQuestions()', () => {
    it('should return an array of Questions', async(inject(
      [AssessmentService, MockBackend],
      (service: AssessmentService, mockBackend: MockBackend) => {

        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify({ data: QUESTIONS }) })));
        });

        service.fetchAssessmentQuestions('1')
          .subscribe(questions => {
            expect(questions).toEqual(QUESTIONS);
          });

      })));
  });

});
