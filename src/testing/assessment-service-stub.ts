import { Observable, Subject } from 'rxjs';
import { Assessment } from '../app/shared/model/assessment';
import { Question } from '../app/shared/model/question';

export class AssessmentServiceStub {
  private assessmentSource: Subject<Assessment>;

  constructor () {
    this.assessmentSource = new Subject<Assessment>();
  }

  getAssessment (assessment_id: string): Observable<Assessment> {
    let assessment = {
      "id": 1,
      "uuid": "89sj0j201j",
      "title": "Língua Portuguesa",
      "instructions": "Star of a unrelated alignment, open the disconnection!",
      "duration": 12,
      "items_count": 10
    };

    return Observable.from([assessment]);
  }

  getQuestions(assessment_id: string): Observable<Question[]> {
    let questions = [
      {
        "assessmentId": 1,
        "id": 1,
        "text": "If you fly or sit with a great truth, silence absorbs you.",
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
      },
      {
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
      }
    ];

    return Observable.from([questions]);
  }

}


