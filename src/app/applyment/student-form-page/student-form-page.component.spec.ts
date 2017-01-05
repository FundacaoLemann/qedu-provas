///<reference path="../../../../node_modules/@angular/core/testing/fake_async.d.ts"/>
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterStub } from '../../../testing/router-stub';
import { SharedModule } from '../../shared/shared.module';
import { StudentFormPageComponent } from './student-form-page.component';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { CoreModule } from '../../core/core.module';
import { AssessmentService } from '../../core/shared/assessment.service';
import { ApplymentService } from '../../core/shared/applyment.service';
import { StoreService } from '../../core/shared/store.service';
import { setInputValue, getInputValue } from '../../../testing/form-helper';

describe('StudentFormPageComponent', () => {
  let component: StudentFormPageComponent;
  let fixture: ComponentFixture<StudentFormPageComponent>;
  let routerService: Router;
  let assessmentService: AssessmentService;
  let applymentService: ApplymentService;
  let route = new ActivatedRouteStub();
  let assessment = {
    "id": 1,
    "uuid": "89sj0j201j",
    "title": "Língua Portuguesa",
    "instructions": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti perspiciatis quos a ad veniam, voluptates voluptatum labore, dignissimos dolorem laudantium inventore fugit doloremque temporibus qui reprehenderit minima aut unde provident cumque numquam consectetur. Quasi impedit, quibusdam totam cupiditate illo laborum dolorem omnis laboriosam esse voluptates, vel tenetur est ut, non numquam voluptas repudiandae ullam veritatis blanditiis! Quibusdam, ea laboriosam tenetur delectus obcaecati minima repellendus, molestias. Cumque, sequi. Architecto rerum amet recusandae. Similique libero rerum facilis commodi architecto consectetur dignissimos deserunt, expedita incidunt voluptatibus voluptatem, perspiciatis iusto impedit itaque. Illo aliquid aut modi assumenda ducimus perspiciatis voluptatum quis ipsa placeat autem. Amet assumenda sint enim veniam aliquid incidunt aperiam, animi beatae.",
    "duration": 1,
    "items_count": 10
  };


  beforeEach(async(() => {
    route.testParams = { uuid: assessment.uuid };

    TestBed.configureTestingModule({
        imports: [SharedModule, CoreModule],
        declarations: [StudentFormPageComponent],
        providers: [
          StoreService,
          ApplymentService,
          { provide: Router, useValue: new RouterStub() },
          { provide: ActivatedRoute, useValue: route },
        ]
      })
      .compileComponents();

  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFormPageComponent);
    component = fixture.componentInstance;
    routerService = fixture.debugElement.injector.get(Router);
    applymentService = fixture.debugElement.injector.get(ApplymentService);
    assessmentService = fixture.debugElement.injector.get(AssessmentService);

    component.assessment = assessment;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the assessment title', async(() => {
    fixture.detectChanges();

    let title = fixture.debugElement.query(By.css('.title')).nativeElement.textContent;
    expect(title).toEqual(assessment.title);
  }));

  it('should navigate to instructions-page when has no errors', () => {
    spyOn(routerService, 'navigate');
    spyOn(applymentService, 'setStudent');

    setInputValue(fixture, '#name', 'John Doe');
    component.onSubmit();

    expect(routerService.navigate).toHaveBeenCalledWith(['prova', assessment.uuid, 'instructions']);
    expect(applymentService.setStudent).toHaveBeenCalledWith({ name: 'John Doe', register_number: '' });
  });

  describe('Form validation', () => {
    it('should display form validation errors', () => {
      let nameControl = component.form.get('name');

      expect(nameControl.errors).toEqual({ required: true });

      setInputValue(fixture, '#name', 'renan');
      expect(nameControl.errors).toBe(null);

      setInputValue(fixture, '#name', '');
      fixture.detectChanges();

      let nameErrorMessages = fixture.debugElement.query(By.css('.name_errors span')).nativeElement;
      expect(nameControl.errors).toEqual({ required: true });
      expect(nameErrorMessages.textContent).toEqual('Campo obrigatório');

      setInputValue(fixture, '#name', 'renan@azevedo1');
      fixture.detectChanges();

      nameErrorMessages = fixture.debugElement.query(By.css('.name_errors span')).nativeElement;
      expect(nameErrorMessages.textContent).toEqual('Caracteres inválidos: @1');
    });
  });
});
