import { Question } from '../src/app/shared/model/question';
import { Answer } from '../src/app/shared/model/answer';
import { Media } from '../src/app/shared/model/media';
import { Assessment } from '../src/app/shared/model/assessment';
import EducationalEntity from '../src/app/shared/model/educational-entity';
import { Student } from '../src/app/shared/model/student';

const md5 = require('md5');
const mock = require('./db.json');

export default class Mock extends Question {

  static mockQuestion(index = 0) {
    let question = new Question();
    question.id = mock.questions[index].id;
    question.text = mock.questions[index].stem;
    question.answers = Mock.mockAnswers(index);
    question.media = [Mock.mockMedia(index)];
    return question;
  }

  static mockAnswers(questionIndex = 0): Answer[] {
    let answers = [];
    for (let forAnswer of mock.questions[questionIndex].options) {
      let answer = new Answer();
      answer.id = forAnswer.id;
      answer.text = forAnswer.description;
      answers.push(answer);
    }
    return answers;
  }

  static mockMedia(questionIndex = 0): Media {
    let media = new Media();
    media.id = md5(mock.questions[questionIndex].image);
    media.type = 'image';
    media.source = mock.questions[questionIndex].image;
    return media;
  }

  static mockAssessment(): Assessment {
    let A = mock.assessments[0];

    let a = new Assessment();
    a.id = A.id;
    a.token = A.token;
    a.mainTitle = A.mainTitle;
    a.secondaryTitle = A.secondaryTitle;
    a.description = A.description;
    a.duration= A.number;
    a.numberOfItems= A.numberOfItems;
    a.subjects = A.subjects;
    a.school = Mock.mockSchool();
    a.department = Mock.mockDepartment();

    return a;
  }

  static mockSchool(): EducationalEntity {
    let S = mock.assessments[0].school;

    let s = new EducationalEntity();
    s.id = S.id;
    s.description = S.description;
    s.image = S.image;

    return s;
  }

  static mockDepartment(): EducationalEntity {
    let D = mock.assessments[0].department;

    let d = new EducationalEntity();
    d.id = D.id;
    d.description = D.description;
    d.image = D.image;

    return d;
  }

  static mockStudent(): Student {
    let S = mock.students[0];

    let s = new Student();
    s.id = S.id;
    s.token = '12a11';
    s.name = S.name;
    s.class = S.class.description;
    s.matricula = S.registrationNumber;

    return s;
  }

}
