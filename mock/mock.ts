import { Item } from '../src/app/shared/model/item';
import { Option } from '../src/app/shared/model/option';
import { Media } from '../src/app/shared/model/media';
import { Assessment } from '../src/app/shared/model/assessment';
import EducationalEntity from '../src/app/shared/model/educational-entity';
import { Student } from '../src/app/shared/model/student';
import Answer from '../src/app/shared/model/answer';

const md5 = require('md5');
const mock = require('./db.json');

export default class Mock {

  static mockItem(index = 0) {
    let item = new Item();
    item.id = mock.questions[index].id;
    item.text = mock.questions[index].stem;
    item.answers = Mock.mockOptions(index);
    item.media = [Mock.mockMedia(index)];
    return item;
  }

  static mockOptions(itemIndex = 0): Option[] {
    let options = [];
    for (let forAnswer of mock.questions[itemIndex].options) {
      let option = new Option();
      option.id = forAnswer.id;
      option.text = forAnswer.description;
      options.push(option);
    }
    return options;
  }

  static mockMedia(questionIndex = 0): Media {
    const question = mock.questions[questionIndex];
    let media = new Media();
    if(question.image) {
      media.id = md5(question.image);
      media.type = 'image';
      media.source = question.image;
      return media;
    }
    else {
      return null;
    }
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

  static mockAnswer(index = 0): Answer {
    let ANSWER = mock.answers[index];
    let answer = new Answer();
    answer.itemId = ANSWER.itemId;
    answer.optionId = ANSWER.optionId;
    return answer;
  }


  static mockAnswers(): Answer[] {
    const ANSWERS = mock.answers;
    const answers = [];
    for (const A of ANSWERS) {
      const a = new Answer();
      a.itemId = A.itemId;
      a.optionId = A.optionId;
      answers.push(a);
    }
    return answers;
  }

}
