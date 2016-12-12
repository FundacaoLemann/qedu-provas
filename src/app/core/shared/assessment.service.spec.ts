/* tslint:disable:no-unused-variable */
import { TestBed, inject, async } from '@angular/core/testing';
import { AssessmentService } from './assessment.service';
import { HttpModule } from '@angular/http';

describe('AssessmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssessmentService],
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
      () => {},
      error => expect(error).toEqual('404 - Not Found')
    );
  })));

  it('.getQuestions(assessment_id) should return an array of Questions', async(inject([AssessmentService], (service: AssessmentService) => {
    service.getQuestions('1').subscribe(questions => {
      expect(questions[0].text).toEqual('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aspernatur dicta explicabo in nam non nulla, officia possimus repellendus voluptatibus. Adipisci alias assumenda facilis harum illum laborum neque nostrum reprehenderit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore inventore ipsa maxime modi nam placeat quis temporibus voluptatum. Labore, suscipit?');
      expect(questions[1].text).toEqual('Wow, courage!Lord, ye cold jack- set sails for adventure! Dozens of anomalies will be lost in plasmas like attitudes in alarms');
    });
  })));

});
