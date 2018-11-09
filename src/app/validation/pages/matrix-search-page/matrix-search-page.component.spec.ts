import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError, Subject } from 'rxjs';

import { ValidationModule } from '../../validation.module';
import { MatrixSearchPageComponent } from './matrix-search-page.component';
import { AssessmentService } from '../../../core/services/assessment.service';
import { MatrixService } from '../../../core/services/matrix/matrix.service';
import { By } from '@angular/platform-browser';
import { MatrixFixture } from '../../../../testing/fixtures/matrix-fixture';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';
import { ValidationStateService } from '../../services/validation-state.service';


describe('MatrixSearchPageComponent', () => {
  let component: MatrixSearchPageComponent;
  let fixture: ComponentFixture<MatrixSearchPageComponent>;
  let router: Router;
  let route: ActivatedRouteStub;
  let matrixService: MatrixService;
  let stateService: ValidationStateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ValidationModule, RouterTestingModule],
      providers: [
        AssessmentService,
        { provide: ActivatedRoute, useFactory: () => new ActivatedRouteStub() }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixSearchPageComponent);
    component = fixture.componentInstance;
    matrixService = TestBed.get(MatrixService);
    stateService = TestBed.get(ValidationStateService);
    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handles form submit', () => {
    const matrixMock = MatrixFixture.get();
    const matrixMock$ = new Subject();

    spyOn(matrixService, 'getMatrix').and.returnValue(matrixMock$.asObservable());
    spyOn(stateService, 'setState');
    spyOn(router, 'navigateByUrl');

    component.matrixId = '12345';
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', {});

    matrixMock$.next(matrixMock);
    matrixMock$.complete();

    expect(matrixService.getMatrix).toHaveBeenCalledWith({ id: '12345'});
    expect(stateService.setState).toHaveBeenCalledWith({ matrix: matrixMock });

    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', {});

    expect(router.navigateByUrl).toHaveBeenCalledWith(`/validacao/${matrixMock.id}/item/1`);
  });

  it('renders error messages', () => {
    spyOn(matrixService, 'getMatrix').and.returnValue(throwError(new Error('Matrix not found.')));

    component.matrixId = 'invalid_assessment_code';

    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', {});
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('.error'));
    expect(errorEl.nativeElement.innerText).toEqual('Matrix not found.');
  });


  it('renders matrix info', () => {
    const matrix = MatrixFixture.get();
    component.matrix = matrix;

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('qp-matrix-info'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('form'))).toBeFalsy();
  });

  it('submits matrix id when passed by url', async(() => {
    spyOn(matrixService, 'getMatrix').and.returnValue(of(null));

    route.setParamMap({ id: '12345' });

    expect(matrixService.getMatrix).toHaveBeenCalledWith({id: '12345'});
  }));

});
