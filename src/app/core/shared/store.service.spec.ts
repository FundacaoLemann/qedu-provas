/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { StoreService } from './store.service';
import { Student } from '../../shared/model/student';

describe('StoreService', () => {
  let service: StoreService;

  let question = {
    "assessmentId": 1,
    "id": 2,
    "text": "Wow, courage!Lord, ye cold jack- set sails for adventure! Dozens of anomalies will be lost in plasmas like attitudes in alarms",
    "answers": [
      {
        "id": 1,
        "text": "Cum lumen assimilant, omnes rationees tractare fortis, neuter urbses."
      },
      {
        "id": 2,
        "text": "Place the margerine in a fine-mesh strainer, and flavor fairly with divided BBQ sauce."
      },
      {
        "id": 3,
        "text": "Oh, never lead a shark."
      },
      {
        "id": 4,
        "text": "The collision course is a distant space suit."
      },
      {
        "id": 5,
        "text": "Talis, nobilis adiurators acceleratrix experientia de flavum, festus lapsus."
      }
    ]
  };
  let answer = question.answers[4];
  let question2 = {
    "assessmentId": 1,
    "id": 1,
    "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aspernatur dicta explicabo in nam non nulla, officia possimus repellendus voluptatibus. Adipisci alias assumenda facilis harum illum laborum neque nostrum reprehenderit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore inventore ipsa maxime modi nam placeat quis temporibus voluptatum. Labore, suscipit?",
    "answers": [
      {
        "id": 1,
        "text": "Cum lumen assimilant, omnes rationees tractare fortis, neuter urbses."
      },
      {
        "id": 2,
        "text": "Place the margerine in a fine-mesh strainer, and flavor fairly with divided BBQ sauce."
      },
      {
        "id": 3,
        "text": "Oh, never lead a shark."
      },
      {
        "id": 4,
        "text": "The collision course is a distant space suit."
      },
      {
        "id": 5,
        "text": "Talis, nobilis adiurators acceleratrix experientia de flavum, festus lapsus."
      }
    ]
  };
  let answer2 = question.answers[1];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreService]
    });
  });

  beforeEach(() => {
    service = new StoreService();
  });

  it('should set data', inject([StoreService], (service: StoreService) => {
    let student = new Student('John Doe', '332441');
    service.setStudent(student);
  }));

  it('should store a new answer', () => {
    service.setAnswer(question.id, answer.id);
    expect(service.getAnswers()).toEqual([jasmine.objectContaining({
      question_id: question.id,
      answer_id: answer.id
    })]);

    service.setAnswer(question2.id, answer2.id);
    expect(service.getAnswers()).toEqual([
      jasmine.objectContaining({ question_id: question.id, answer_id: answer.id }),
      jasmine.objectContaining({ question_id: question2.id, answer_id: answer2.id })
    ]);
  });

  it('should update an set answer', () => {
    service.setAnswer(question.id, answer.id);
    service.setAnswer(question.id, question.answers[0].id);

    expect(service.getAnswers()).toEqual([
      jasmine.objectContaining({ question_id: question.id, answer_id: question.answers[0].id }),
    ]);
  });

});
