import { async, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import * as md5 from 'md5';
import * as _ from 'lodash';

import Mock from '../../../mock/mock';
import { environment } from '../../environments/environment';
import { AssessmentService } from './assessment.service';

const mock = require('../../../mock/db.json');
const ASSESSMENT = mock.assessments[0];
const QUESTIONS = mock.questions;
const { API_URL } = environment;

describe('AssessmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssessmentService],
      imports: [HttpClientTestingModule],
    });
  });

  it(
    'should construct service',
    inject([AssessmentService], (service: AssessmentService) => {
      expect(service).toBeTruthy();
    }),
  );

  describe('fetchAssessment()', () => {
    it('should return an Assessment', async(
      inject(
        [AssessmentService, HttpTestingController, HttpClient],
        (service: AssessmentService, mockHttp: HttpTestingController) => {
          service
            .fetchAssessment('1')
            .subscribe(assessment => expect(assessment).toEqual(ASSESSMENT));

          const resp = mockHttp.expectOne(`${API_URL}/assessments/1`);

          resp.flush({ data: ASSESSMENT });
        },
      ),
    ));
  });

  describe('fetchAssessmentQuestions()', () => {
    it('should return an array of Questions', async(
      inject(
        [AssessmentService, HttpTestingController],
        (service: AssessmentService, mockHttp: HttpTestingController) => {
          service
            .fetchAssessmentQuestions('foo', 'bar')
            .subscribe(questions => {
              expect(questions.length).toEqual(3);
              expect(questions[0].id).toEqual('58d2f1af4a083c00194437c7');
              expect(questions[0].text).toEqual(
                'Qual o melhor time do Rio? {{' +
                  md5(QUESTIONS[0].image) +
                  '}}',
              );
              expect(questions[0].answers.length).toEqual(4);
              expect(questions[0].media).toBeTruthy();
            });

          mockHttp
            .expectOne(
              req =>
                req.url === `${API_URL}/assessments/foo/items` &&
                req.method === 'GET' &&
                req.headers.get('Authorization') === 'bar',
            )
            .flush({ data: { items: QUESTIONS } });
        },
      ),
    ));
  });

  describe('postAnswers', () => {
    it('should post answers to the API', async(
      inject(
        [AssessmentService, HttpTestingController],
        (service: AssessmentService, mockHttp: HttpTestingController) => {
          const assessmentToken = 'ASSESSMENT_TOKEN';
          const studentToken = 'STUDENT_TOKEN';
          const answers = Mock.mockAnswers();

          service
            .postAnswers(assessmentToken, studentToken, answers)
            .subscribe();

          mockHttp
            .expectOne(
              req =>
                req.url === `${API_URL}/assessments/ASSESSMENT_TOKEN/answers` &&
                req.headers.get('Authorization') === 'STUDENT_TOKEN' &&
                _.isEqual(req.body, { answers }),
            )
            .flush(
              { message: { data: 'Respostas salvas.' } },
              { status: 200, statusText: 'OK' },
            );

          mockHttp.verify();
        },
      ),
    ));

    it(
      'should timeout',
      fakeAsync(
        inject(
          [AssessmentService, HttpTestingController],
          (service: AssessmentService, mockHttp: HttpTestingController) => {
            let error = null;
            service
              .postAnswers('aToken', 'sToken', [])
              .subscribe(() => {}, err => (error = err));

            mockHttp.expectOne(() => true);

            tick(59999);
            expect(error).toEqual(null);

            tick(1);

            expect(error instanceof Error).toBeTruthy();
          },
        ),
      ),
    );
  });

  describe('downloadBackup()', () => {
    it(
      'should return base64 string with student answers',
      inject([AssessmentService], (service: AssessmentService) => {
        window.localStorage.clear();
        window.localStorage.setItem(
          'answers-PXK-9997',
          'W3sib3B0aW9uSWQiOjMsIml0ZW1JZCI6IjU4ZWQzMGEx' +
            'OTk3ZTIxMGFjYTA5MDE3ZCJ9LHsib3B0aW9uSWQiOjQsIml0ZW1JZCI6IjU4ZWQzMGExOTk3ZTIxMGFjYTA5MDE3ZS' +
            'J9LHsib3B0aW9uSWQiOjIsIml0ZW1JZCI6IjU4ZWQzMGExOTk3ZTIxMGFjYTA5MDE3ZiJ9LHsib3B0aW9uSWQiOjQs' +
            'Iml0ZW1JZCI6IjU4ZWQzMGExOTk3ZTIxMGFjYTA5MDE4MCJ9XQ==',
        );

        const content = service.downloadBackup('offjkl9');

        expect(content).toEqual(
          'data:text/plain;charset=utf-8,' +
            encodeURIComponent(
              '{"answers-PXK-9997":"W3sib3B0aW9uSWQiOjMsIml0ZW1JZCI6IjU4ZWQzMGExOTk3ZT' +
                'IxMGFjYTA5MDE3ZCJ9LHsib3B0aW9uSWQiOjQsIml0ZW1JZCI6IjU4ZWQzMGExOTk3ZTIxMGFjYTA5MDE3ZSJ9LHsi' +
                'b3B0aW9uSWQiOjIsIml0ZW1JZCI6IjU4ZWQzMGExOTk3ZTIxMGFjYTA5MDE3ZiJ9LHsib3B0aW9uSWQiOjQsIml0ZW' +
                '1JZCI6IjU4ZWQzMGExOTk3ZTIxMGFjYTA5MDE4MCJ9XQ=="}',
            ),
        );
      }),
    );
  });
});
