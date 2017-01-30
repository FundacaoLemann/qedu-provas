import { Observable, Subject } from 'rxjs';
import { Assessment } from '../app/shared/model/assessment';
import { Question } from '../app/shared/model/question';

export class AssessmentServiceStub {
  private assessmentSource: Subject<Assessment>;

  constructor () {
    this.assessmentSource = new Subject<Assessment>();
  }

  getAssessment (assessmentId: string): Observable<Assessment> {
    let assessment = {
      "id": 1,
      "uuid": "89sj0j201j",
      "main_title": "Língua Portuguesa",
      "instructions": "Star of a unrelated alignment, open the disconnection!",
      "description": "Star of a unrelated alignment, open the disconnection!",
      "duration": 12,
      "items_count": 10
    };

    return Observable.of(assessment);
  }

  getQuestions(assessmentId: string): Observable<Question[]> {
    let questions = [
      {
        "assessmentId": 1,
        "id": 2,
        "text": "Wow, courage!Lord, ye cold jack- set sails for adventure! Dozens of anomalies will be lost in plasmas like attitudes in alarms",
        "media" : [],
        "answers": [
          {
            "id": 1,
            "text": "Simmer mackerel thoroughly, then mix with milk and serve carefully in wok."
          },
          {
            "id": 2,
            "text": "Peace at the homeworld was the alarm of starlight travel, arrested to an extraterrestrial hur'q."
          },
          {
            "id": 3,
            "text": "Where is the golden gull."
          },
          {
            "id": 4,
            "text": "Cum adelphis tolerare, omnes resistentiaes manifestum nobilis, domesticus decores."
          },
          {
            "id": 5,
            "text": "Dead, colorful ships patiently examine a reliable, vital space suit."
          }
        ]
      },
      {
        "assessmentId": 1,
        "id": 3,
        "text": "Consectetur adipisicing elit. Ab autem ducimus ea fuga nesciunt nulla sed voluptatibus?",
        "media": [],
        "answers": [
          {
            "id": 1,
            "text": "Per guest prepare one container of ricotta with chopped celery for dessert."
          },
          {
            "id": 2,
            "text": "Leek mousse has to have a shredded, sour okra component."
          },
          {
            "id": 3,
            "text": "Moons yell with coordinates at the senior radiation dome!"
          },
          {
            "id": 4,
            "text": "If you disappear or occur with a superior dogma, chaos absorbs you."
          },
          {
            "id": 5,
            "text": "Pol, varius triticum!"
          }
        ]
      }
    ];

    return Observable.from([questions]);
  }

}


