import { TestBed, inject, async } from '@angular/core/testing';
import { AssessmentService } from './assessment.service';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { environment } from '../../../environments/environment';
import { createResponse } from '../../../testing/testing-helper';
import { Question } from '../../shared/model/question';

const mock = require('../../../../mock/db.json');
const ASSESSMENT = mock.assessments[0];
const STUDENT = mock.students[0];
const QUESTIONS = mock.questions;
const { API_URL } = environment;

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

  fdescribe('fetchAssessmentQuestions()', () => {
    it('should return an array of Questions', async(inject(
      [AssessmentService, MockBackend],
      (service: AssessmentService, mockBackend: MockBackend) => {

        mockBackend
          .connections
          .subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify({ data: { items: QUESTIONS } }) })));
          });

        let expected = questions => {
          expect(questions.length).toEqual(3);
          expect(questions[0].id).toEqual('58d2f1af4a083c00194437c7');
          expect(questions[0].text).toEqual('Qual o melhor time do Rio?');
          expect(questions[0].answers.length).toEqual(5);
          expect(questions[0].media).toBeTruthy();
        };

        service
          .fetchAssessmentQuestions('AssessmentToken', 'studentToken')
          .subscribe(expected);
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

  describe('postAnswer', () => {
    it('should send a PATCH to the API with an answer',
      async(inject(
        [AssessmentService, MockBackend, Http],
        (service: AssessmentService, mockBackend: MockBackend, http: Http) => {
          spyOn(http, 'post').and.callThrough();
          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({ body: 'OK' })));
          });
          const url = `${API_URL}/assessment/${ASSESSMENT.token}/answer`;
          const answer = {
            assessmentToken: ASSESSMENT.token,
            studentToken: STUDENT.token,
            questionId: QUESTIONS[0].id,
            value: '1'
          };
          const response = service.postAnswer(answer);
          response.subscribe(resp => {
            expect(resp).toEqual(jasmine.any(Response));
            expect(http.post).toHaveBeenCalledWith(url, answer);
          });
        })
      ));
  });

  describe('extractData()', () => {
    it('should return an Assessment',
      inject([AssessmentService], (service: AssessmentService) => {
        const body = `{"data": ${JSON.stringify(ASSESSMENT)}}`;
        const options = {
          status: 200,
          statusText: 'OK',
          body: body
        };
        const response = new Response(new ResponseOptions(options));

        expect(AssessmentService.extractData(response)).toEqual(ASSESSMENT);
      })
    );
  });

  describe('handleError()', () => {
    it('should return an error message',
      async(inject([AssessmentService], (service: AssessmentService) => {
        const respBody = {
          error: {
            code: 404,
            message: 'Prova não encontrada'
          }
        };
        const response = createResponse(404, 'Not Found', respBody);
        const expectation = error => {
          expect(error).toEqual('Prova não encontrada');
        };

        AssessmentService.handleError(response)
                         .subscribe(() => {}, expectation);
      }))
    );
  });

});
