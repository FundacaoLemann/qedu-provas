import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { empty, of, throwError } from 'rxjs';

import { SharedModule } from '../../shared/shared.module';
import { MatrixSearchPageComponent } from './matrix-search-page.component';
import { AssessmentService } from '../../core/services/assessment.service';
import { MatrixService } from '../../core/services/matrix/matrix.service';
import { By } from '@angular/platform-browser';

fdescribe('MatrixSearchPageComponent', () => {
  let component: MatrixSearchPageComponent;
  let fixture: ComponentFixture<MatrixSearchPageComponent>;
  let matrixService: MatrixService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [AssessmentService],
      declarations: [MatrixSearchPageComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixSearchPageComponent);
    component = fixture.componentInstance;
    matrixService = TestBed.get(MatrixService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handles form submit', () => {
    spyOn(matrixService, 'getMatrix').and.returnValue(of(null));

    component.matrixId = '12345';
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', {});

    expect(matrixService.getMatrix).toHaveBeenCalledWith({ id: '12345'});
  });

  it('renders error messages', () => {
    spyOn(matrixService, 'getMatrix').and.returnValue(throwError(new Error('Matrix not found.')));

    component.matrixId = 'invalid_assessment_code';

    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', {});
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('.error'));
    expect(errorEl.nativeElement.innerText).toEqual('Matrix not found.');
  });

});
