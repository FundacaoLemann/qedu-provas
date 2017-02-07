import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// App
import { RouterStub } from '../../../testing/router-stub';
import { StudentAuthenticationPageComponent } from './student-authentication-page.component';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { ApplymentService } from '../../core/shared/applyment.service';
import { StoreService } from '../../core/shared/store.service';
import { StudentService } from '../../core/shared/student.service';
import { camelizeObject } from '../../utils/json';
import * as test from '../../../testing/testing-helper';
import { ApplymentModule } from '../applyment.module';

const mockStudent = {
  id: '1234',
  access_token: '1234',
  name: 'John Doe',
  matricula: '98765',
};

describe('StudentAuthenticationPageComponent', () => {
  let component: StudentAuthenticationPageComponent;
  let fixture: ComponentFixture<StudentAuthenticationPageComponent>;
  let applymentService: ApplymentService;
  let studentService: StudentService;
  let router: Router;
  const route = new ActivatedRouteStub();
  route.testParams = { 'uuid': '1' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ApplymentModule],
        providers: [
          StoreService,
          ApplymentService,
          StudentService,
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useValue: route },
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAuthenticationPageComponent);
    component = fixture.componentInstance;

    applymentService = fixture.debugElement.injector.get(ApplymentService);
    studentService = fixture.debugElement.injector.get(StudentService);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should load student data from service', () => {
    spyOn(applymentService, 'getStudent').and.returnValue(mockStudent);
    component.student = null;
    component.ngOnInit();
    expect(component.student).toEqual(mockStudent);
  });

  describe('Submitting form', () => {
    beforeEach(() => {
      spyOn(applymentService, 'setStudent');
      spyOn(router, 'navigate');

      component.student = null;
      fixture.detectChanges();
    });

    it('should fetch student data when submit', async(() => {
      spyOn(studentService, 'getStudentByToken').and.returnValue(Observable.of(mockStudent));
      component.accessToken = '12345';
      component.onSubmit();
      expect(applymentService.setStudent).toHaveBeenCalledWith(camelizeObject(mockStudent));
    }));

    it('should display `Código inválido` when accessToken is invalid', async(() => {
      spyOn(studentService, 'getStudentByToken').and.returnValue(Observable.of(null));
      component.accessToken = '000';
      component.onSubmit();
      fixture.detectChanges();

      expect(test.getNativeElement(fixture, '.error').textContent).toEqual('Código inválido');
    }));
  });

  describe('Displaying student data', () => {
    beforeEach(() => {
      spyOn(applymentService, 'getStudent').and.returnValue(mockStudent);
      spyOn(router, 'navigate');
      component.student = mockStudent;
      fixture.detectChanges();
    });

    it('should display student data', () => {
      expect(test.getNativeElement(fixture, '[studentName]').textContent).toEqual(mockStudent.name);
      expect(test.getNativeElement(fixture, '[studentMatricula]').textContent).toEqual(mockStudent.matricula);
    });

    it('should continue to the next page', () => {
      test.dispatchEvent(fixture, '[continue]', 'click');
      expect(router.navigate).toHaveBeenCalledWith(['prova', '1', 'instrucoes']);
    });

    it('should clear student data and go back to search', () => {
      test.dispatchEvent(fixture, '[cancel]', 'click');
      expect(component.student).toEqual(null);
      expect(component.accessToken).toEqual(null);
      expect(component.error).toEqual(null);
    });
  });

});
