import { TestBed, inject, async } from '@angular/core/testing';
import { AssessmentService } from './assessment.service';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, Headers } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { createResponse } from '../../../testing/testing-helper';
import Mock from '../../../../mock/mock';

const md5 = require('md5');
const mock = require('../../../../mock/db.json');
const ASSESSMENT = mock.assessments[0];
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

  describe('fetchAssessmentQuestions()', () => {
    it('should return an array of Questions', async(inject(
      [AssessmentService, MockBackend],
      (service: AssessmentService, mockBackend: MockBackend) => {

        mockBackend
          .connections
          .subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify({ data: { items: QUESTIONS } }) })));
          });

        const expected = questions => {
          expect(questions.length).toEqual(3);
          expect(questions[0].id).toEqual('58d2f1af4a083c00194437c7');
          expect(questions[0].text).toEqual('Qual o melhor time do Rio? {{' + md5(QUESTIONS[0].image) + '}}');
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

  describe('postAnswers', () => {
    it('should post answers to the API',
      async(inject(
        [AssessmentService, MockBackend, Http],
        (service: AssessmentService, mockBackend: MockBackend, http: Http) => {
          const mockResponse = new Response(new ResponseOptions({
            status: 200,
            statusText: 'OK',
            body: JSON.stringify({ message: { data: 'Respostas salvas.' } })
          }));
          spyOn(http, 'post').and.returnValue(Observable.of(mockResponse));

          const assessmentToken = Mock.mockAssessment().token;
          const studentToken = Mock.mockStudent().token;
          const answers = Mock.mockAnswers();

          service
            .postAnswers(assessmentToken, studentToken, answers)
            .subscribe(response => {
              const url = `${API_URL}/assessments/${assessmentToken}/answers`;
              const data = answers;
              const options = new BaseRequestOptions();
              options.headers = new Headers({ 'Authorization': studentToken });

              expect(http.post).toHaveBeenCalledWith(url, data, options);
              expect(response.status).toEqual(200);
              expect(response.statusText).toEqual('OK');
              expect(response.json().message.data).toEqual('Respostas salvas.');
            });
        })
      ));
  });

  describe('finishAssessment()', () => {
    it('should PUT to /student',
      async(inject(
        [AssessmentService, MockBackend, Http],
        (service: AssessmentService, mockBackend: MockBackend, http: Http) => {
          const mockResponse = createResponse(200, 'OK', { message: { data: 'Prova Finalizada' } });
          spyOn(http, 'put').and.returnValue(Observable.of(mockResponse));

          const assessmentToken = Mock.mockAssessment().token;
          const studentToken = Mock.mockStudent().token;

          service
            .finishAssessment(assessmentToken, studentToken)
            .subscribe(response => {
              const url = `${API_URL}/assessments/${assessmentToken}/students`;
              const options = new BaseRequestOptions();
              options.headers = new Headers({
                'Authorization': studentToken
              });

              expect(http.put).toHaveBeenCalledWith(url, { finished: true } , options);
              expect(response).toEqual('Prova Finalizada');
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

  describe('downloadBackup()', () => {
    it('should return base64 string with student answers',
      inject([AssessmentService], (service: AssessmentService) => {
          window.localStorage.setItem('answers-PXK-9997', 'W3sib3B0aW9uSWQiOjMsIml0ZW1JZCI6IjU4ZWQzMGExOTk3ZTIxMGFjYTA5MDE3ZCJ9LHsib3B0aW9uSWQiOjQsIml0ZW1JZCI6IjU4ZWQzMGExOTk3ZTIxMGFjYTA5MDE3ZSJ9LHsib3B0aW9uSWQiOjIsIml0ZW1JZCI6IjU4ZWQzMGExOTk3ZTIxMGFjYTA5MDE3ZiJ9LHsib3B0aW9uSWQiOjQsIml0ZW1JZCI6IjU4ZWQzMGExOTk3ZTIxMGFjYTA5MDE4MCJ9XQ==');
          window.localStorage.setItem('assessmentToken', 'caieiras8240a');
          window.localStorage.setItem('studentToken', 'PXK-9997');

          const content = service.downloadBackup('offjkl9');

          expect(content).toEqual('data:text/plain;charset=utf-8,' + encodeURIComponent('{"answers-PXK-9997":"W3sib3B0aW9uSWQiOjMsIml0ZW1JZCI6IjU4ZWQzMGExOTk3ZTIxMGFjYTA5MDE3ZCJ9LHsib3B0aW9uSWQiOjQsIml0ZW1JZCI6IjU4ZWQzMGExOTk3ZTIxMGFjYTA5MDE3ZSJ9LHsib3B0aW9uSWQiOjIsIml0ZW1JZCI6IjU4ZWQzMGExOTk3ZTIxMGFjYTA5MDE3ZiJ9LHsib3B0aW9uSWQiOjQsIml0ZW1JZCI6IjU4ZWQzMGExOTk3ZTIxMGFjYTA5MDE4MCJ9XQ==","assessmentToken":"caieiras8240a","studentToken":"PXK-9997"}'));
      })
    );
  });

});
