import { TestBed, inject, async } from '@angular/core/testing';
import { AssessmentService } from './assessment.service';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { createResponse } from '../../../testing/testing-helper';

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

  describe('postAssessment()', () => {
    it('should post to the API', async(inject(
      [AssessmentService, MockBackend],
      (service: AssessmentService, mockBackend: MockBackend) => {

        const response = { status: 201, statusText: 'Created' };
        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions(response)));
        });

        const assessment = {
          assessmentToken: '1235',
          studentToken: '12345',
          answers: []
        };

        service.postAssessment(assessment)
               .subscribe(resp => {
                 expect(resp).toEqual({ status: 201, statusText: 'Created' });
               });
      })));
  });

  fdescribe('extractData()', () => {
    it('should return an Assessment',
      inject([AssessmentService], (service: AssessmentService) => {
        const body = `{"data": ${JSON.stringify(ASSESSMENT)}}`;
        const options = {
          status: 200,
          statusText: 'OK',
          body: body
        };
        const response = new Response(new ResponseOptions(options));

        expect(service.extractData(response)).toEqual(ASSESSMENT);
      })
    );
  });

  fdescribe('handleError()', () => {
    it('should return an error message',
      async(inject([AssessmentService], (service: AssessmentService) => {
        const respBody = {
          error: {
            code: 404,
            message: "Prova não encontrada"
          }
        };
        const response = createResponse(404, 'Not Found', respBody);
        const expectation = error => {
          expect(error).toEqual('Prova não encontrada');
        };

        service.handleError(response)
               .subscribe(() => {}, expectation);
      }))
    );
  });

});
