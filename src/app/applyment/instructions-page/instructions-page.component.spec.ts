///<reference path="../../../../node_modules/@angular/core/testing/fake_async.d.ts"/>
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterStub } from '../../../testing/router-stub';
import { SharedModule } from '../../shared/shared.module';
import { InstructionsPageComponent } from './instructions-page.component';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { AssessmentService } from '../../core/shared/assessment.service';
import { AssessmentServiceStub } from '../../../testing/assessment-service-stub';
import { dispatchEvent } from '../../../testing/form-helper';

describe('InstructionsPageComponent', () => {
  let component: InstructionsPageComponent;
  let fixture: ComponentFixture<InstructionsPageComponent>;
  let router: Router;
  let route: ActivatedRouteStub;
  let assessmentService: AssessmentServiceStub;

  beforeEach(async(() => {
    let routeStub = new ActivatedRouteStub();
    routeStub.testParams = { uuid: '1' };
    TestBed.configureTestingModule({
        imports: [
          SharedModule,
        ],
        declarations: [InstructionsPageComponent],
        providers: [
          { provide: Router, useValue: new RouterStub() },
          { provide: ActivatedRoute, useValue: routeStub },
          { provide: AssessmentService, useClass: AssessmentServiceStub },
        ]
      })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsPageComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    assessmentService = fixture.debugElement.injector.get(AssessmentService);

    spyOn(router, 'navigate');
    route.testParams = { uuid: '1' };
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should display an assessment details', () => {
    let instructionEl = fixture.debugElement.query(By.css('.instructions')).nativeElement;
    expect(instructionEl.textContent).toEqual('Star of a unrelated alignment, open the disconnection!');

    let durationEl = fixture.debugElement.query(By.css('.duration')).nativeElement;
    expect(durationEl.textContent).toEqual(`12 minutos`);

    let itemsCountEl = fixture.debugElement.query(By.css('.items_count')).nativeElement;
    expect(itemsCountEl.textContent).toEqual(`10 questões`);
  });

  it('should redirect to question page when button clicked', () => {
    dispatchEvent(fixture, 'button.continue', 'click');
    expect(router.navigate).toHaveBeenCalledWith(['prova', 1, 'questao', '1']);
  });
})
;
