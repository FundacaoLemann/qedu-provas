/* tslint:disable:no-unused-variable */
import { TestBed, inject, async } from '@angular/core/testing';
import { AssessmentService } from './assessment.service';
import { HttpModule } from '@angular/http';
import { AssessmentServiceStub } from '../../../testing/assessment-service-stub';

describe('AssessmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AssessmentService, useClass: AssessmentServiceStub }
      ],
      imports: [HttpModule]
    });
  });

  it('should construct service', inject([AssessmentService], (service: AssessmentService) => {
    expect(service).toBeTruthy();
  }));

  it('.getAssessment(assessment_id) should return an Assessment', async(inject([AssessmentService], (service: AssessmentService) => {
    service.getAssessment('1').subscribe(assessment => expect(assessment.title).toEqual('Língua Portuguesa'));
  })));

  it('.getAssessment(assessment_id) should catch an error when id is invalid', async(inject([AssessmentService], (service: AssessmentService) => {
    service.getAssessment('10').subscribe(
      () => {
      },
      error => expect(error).toEqual('404 - Not Found')
    );
  })));

  it('.getQuestions(assessment_id) should return an array of Questions', async(inject([AssessmentService], (service: AssessmentService) => {
    service.getQuestions('1').subscribe(questions => {
      expect(questions[0].text).toEqual('Wow, courage!Lord, ye cold jack- set sails for adventure! Dozens of anomalies will be lost in plasmas like attitudes in alarms');
      expect(questions[1].text).toEqual('Consectetur adipisicing elit. Ab autem ducimus ea fuga nesciunt nulla sed voluptatibus?');
    });
  })));

});
