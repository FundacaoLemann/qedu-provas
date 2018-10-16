import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { StudentService } from './student.service';

const { API_URL } = environment;
const db = require('../../../../mock/db.json');
const RAW_STUDENT = db.students[0];
const PARSED_STUDENT = {
  id: '58d2f1af4a083c00194437c6',
  matricula: '11223344',
  name: 'Mario Junior Oliveira',
  class: '901A',
};

describe('StudentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentService],
    });
  });

  it(
    'should be truthy',
    inject([StudentService], (service: StudentService) => {
      expect(service).toBeTruthy();
    }),
  );

  it(
    'should return a parsed student',
    async(
      inject(
        [StudentService, HttpTestingController],
        (service: StudentService, mockHttp: HttpTestingController) => {
          service
            .getStudentByToken('STUDENT_TOKEN', 'ASSESSMENT_TOKEN')
            .subscribe(student => {
              expect(student).toEqual(PARSED_STUDENT);
            });

          mockHttp
            .expectOne(
              req =>
                req.url ===
                  `${API_URL}/assessments/ASSESSMENT_TOKEN/students` &&
                req.method === 'GET' &&
                req.headers.get('Authorization') === 'STUDENT_TOKEN',
            )
            .flush({ data: RAW_STUDENT });
        },
      ),
    ),
  );
});
