///<reference path="../../../../node_modules/@angular/core/testing/fake_async.d.ts"/>
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterStub } from '../../../testing/router-stub';
import { SharedModule } from '../../shared/shared.module';
import { InstructionsPageComponent } from './instructions-page.component';
import { dispatchEvent } from '../../../testing/form-helper';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { ASSESSMENTS } from '../../../mocks/assessments-mock';

describe('InstructionsPageComponent', () => {
  let component: InstructionsPageComponent;
  let fixture: ComponentFixture<InstructionsPageComponent>;
  let router: Router;
  let route: ActivatedRouteStub;
  let assessment = ASSESSMENTS[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [SharedModule],
        declarations: [InstructionsPageComponent],
        providers: [
          { provide: Router, useValue: new RouterStub() },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub }
        ]
      })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsPageComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    fixture.detectChanges();

    spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an assessment details', () => {
    let instructionEl = fixture.debugElement.query(By.css('.instructions')).nativeElement;
    expect(instructionEl.textContent).toEqual(assessment.instructions);

    let durationEl = fixture.debugElement.query(By.css('.duration')).nativeElement;
    expect(durationEl.textContent).toEqual(`${assessment.duration} minutos`);

    let itemsCountEl = fixture.debugElement.query(By.css('.items_count')).nativeElement;
    expect(itemsCountEl.textContent).toEqual(`${assessment.items_count} questões`);
  });

  it('should redirect to question page when button clicked', () => {
    route.testParams = { uuid: '1' };

    dispatchEvent(fixture, 'button.continue', 'click');
    expect(router.navigate).toHaveBeenCalledWith(['prova', '1', 'questao', '1']);
  });
});
