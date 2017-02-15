import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressionPathComponent } from './progression-path.component';
import { By } from '@angular/platform-browser';
import { RouterStub } from '../../../../testing/router-stub';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';
import { ApplymentService } from '../../../core/shared/applyment.service';
import { AppModule } from '../../../app.module';
import * as test from '../../../../testing/testing-helper';

const db = require('../../../../../mock/db.json');
const mockQuestions = db.questions;

describe('ProgressionPathComponent', () => {
  let component: ProgressionPathComponent;
  let fixture: ComponentFixture<ProgressionPathComponent>;
  let router: Router;
  let applymentService: ApplymentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          AppModule
        ],
        providers: [
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useFactory: () => new ActivatedRouteStub({ uuid: '1' }) },
          ApplymentService
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressionPathComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    applymentService = fixture.debugElement.injector.get(ApplymentService);

    applymentService.initAnswers(mockQuestions.length);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the questions', async(() => {
    const debugEls = test.getAllDebugElements(fixture, 'ul li');
    expect(debugEls.length).toEqual(mockQuestions.length);

    for ( let i = 0; i < mockQuestions.length; i++ ) {
      const match = debugEls[i].query(By.css(`.number`)).nativeElement.textContent;
      const expected = (i + 1).toString();
      expect(match).toEqual(expected);
    }
  }));

  it('should navigate to question on click', () => {
    spyOn(router, 'navigate');
    fixture.debugElement.queryAll(By.css('ul li'))[1].nativeElement.click();

    expect(router.navigate).toHaveBeenCalledWith(['prova', '1', 'questao', '2']);
  });

  it('should display the answers with .answered', async(() => {
    applymentService.setAnswer(0, 3);
    applymentService.setAnswer(1, 3);
    applymentService.setAnswer(2, 3);
    fixture.detectChanges();

    const match = fixture.debugElement.queryAll(By.css('ul li.answered')).length;
    expect(match).toEqual(3);
  }));
});
