import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressionPathComponent } from './progression-path.component';
import { By } from '@angular/platform-browser';
import { RouterStub } from '../../../../testing/router-stub';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';
import { ApplymentService } from '../../shared/applyment.service';
import { AppModule } from '../../../app.module';
import * as test from '../../../../testing/testing-helper';
import Mock from '../../../../../mock/mock';

const db = require('../../../../../mock/db.json');
const QUESTIONS = [Mock.mockItem(0), Mock.mockItem(1), Mock.mockItem(2)];

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
          { provide: ActivatedRoute, useFactory: () => new ActivatedRouteStub({ token: '1' }) },
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

    applymentService.initAnswers(QUESTIONS);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the questions', async(() => {
    const debugEls = test.getAllDebugElements(fixture, 'ul li');
    expect(debugEls.length).toEqual(QUESTIONS.length);

    for (let i = 0; i < QUESTIONS.length; i++ ) {
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
    applymentService.setAnswer(0, Mock.mockAnswer(0));
    applymentService.setAnswer(1, Mock.mockAnswer(1));
    applymentService.setAnswer(2, Mock.mockAnswer(2));
    fixture.detectChanges();

    const match = fixture.debugElement.queryAll(By.css('ul li.answered')).length;
    expect(match).toEqual(3);
  }));
});
