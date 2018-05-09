import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError, of } from 'rxjs';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { RouterStub } from '../../../testing/router-stub';
import * as test from '../../../testing/testing-helper';
import { StoreService } from '../../core/shared/store.service';
import { StudentService } from '../../core/shared/student.service';
import { ApplymentModule } from '../applyment.module';
import { ApplymentService } from '../shared/applyment.service';
import { StudentAuthenticationPageComponent } from './student-authentication-page.component';
import { ResponseError } from 'app/shared/errors/response-error';

const db = require('../../../../mock/db.json');
const RAW_STUDENT = db.students[0];
const PARSED_STUDENT = {
  id: '58d2f1af4a083c00194437c6',
  matricula: '11223344',
  name: 'Mario Junior Oliveira',
  class: '901A',
};
const ASSESSMENT = db.assessments[0];

describe('StudentAuthenticationPageComponent', () => {
  let component: StudentAuthenticationPageComponent;
  let fixture: ComponentFixture<StudentAuthenticationPageComponent>;
  let applymentService: ApplymentService;
  let studentService: StudentService;
  let router: Router;
  const route = new ActivatedRouteStub();
  route.testParams = { token: '1' };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ApplymentModule],
        providers: [
          StoreService,
          ApplymentService,
          StudentService,
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useValue: route },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAuthenticationPageComponent);
    component = fixture.componentInstance;

    applymentService = fixture.debugElement.injector.get(ApplymentService);
    applymentService.setAssessment(ASSESSMENT);
    studentService = fixture.debugElement.injector.get(StudentService);
    router = fixture.debugElement.injector.get(Router);
  });

  it(
    'should load getStudent data from service',
    async(() => {
      spyOn(applymentService, 'getStudent').and.returnValue(RAW_STUDENT);
      component.student = null;
      component.ngOnInit();
      expect(component.student).toEqual(RAW_STUDENT);
    }),
  );

  describe('Submitting form', () => {
    beforeEach(() => {
      spyOn(applymentService, 'setStudent');
      spyOn(router, 'navigate');

      component.student = null;
      fixture.detectChanges();
    });

    it(
      'should fetch getStudent data when submit',
      async(() => {
        spyOn(studentService, 'getStudentByToken').and.returnValue(
          of(PARSED_STUDENT),
        );
        component.accessToken = '1235';
        component.onSubmit();
        expect(applymentService.setStudent).toHaveBeenCalledWith(
          PARSED_STUDENT,
        );
      }),
    );

    it(
      'should display `Código inválido` when accessToken is invalid',
      async(() => {
        spyOn(studentService, 'getStudentByToken').and.returnValue(
          throwError(new ResponseError('Código inválido')),
        );
        component.accessToken = '000';
        component.onSubmit();
        fixture.detectChanges();

        expect(test.getNativeElement(fixture, '.error').textContent).toEqual(
          'Código inválido',
        );
      }),
    );
  });

  describe('Displaying getStudent data', () => {
    beforeEach(() => {
      applymentService.setStudent(PARSED_STUDENT);
      spyOn(router, 'navigate');
      component.student = PARSED_STUDENT;
      fixture.detectChanges();
    });

    it('should display getStudent data', () => {
      expect(
        test.getNativeElement(fixture, '[studentName]').textContent,
      ).toEqual(PARSED_STUDENT.name);
      expect(
        test.getNativeElement(fixture, '[studentMatricula]').textContent,
      ).toEqual(PARSED_STUDENT.matricula);
    });

    it('should display getStudent class', () => {
      const studentClass = fixture.debugElement.query(By.css('[studentClass]'))
        .nativeElement.textContent;
      expect(studentClass).toEqual(PARSED_STUDENT.class);
    });

    it('should continue to the next page', () => {
      test.dispatchEvent(fixture, '[continue]', 'click');
      expect(router.navigate).toHaveBeenCalledWith([
        'prova',
        '1',
        'instrucoes',
      ]);
    });

    it('should clear getStudent data and go submitAnswerAndNavigateBack to search', () => {
      test.dispatchEvent(fixture, '[cancel]', 'click');
      expect(component.student).toEqual({});
      expect(component.accessToken).toEqual(null);
      expect(component.error).toEqual(null);
    });
  });
});
