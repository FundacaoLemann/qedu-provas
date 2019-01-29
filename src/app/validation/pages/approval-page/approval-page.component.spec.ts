import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ValidationModule } from '../../validation.module';
import { SharedModule } from '../../../shared/shared.module';
import { ApplymentModule } from '../../../applyment/applyment.module';
import { MatrixService } from '../../../core/services/matrix/matrix.service';
import { ValidationStateService } from '../../services/validation-state.service';
import { ApprovalPageComponent } from './approval-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatrixFixture } from '../../../../testing/fixtures/matrix-fixture';
import { Matrix } from '../../../shared/model/matrix';

describe('ApprovalPageComponent', () => {
  let component: ApprovalPageComponent;
  let fixture: ComponentFixture<ApprovalPageComponent>;
  let matrixService: MatrixService;
  let stateService: ValidationStateService;
  let matrixMock: Matrix;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ValidationModule,
        ApplymentModule,
        SharedModule,
        HttpClientTestingModule,
      ],
      providers: [MatrixService, ValidationStateService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalPageComponent);
    matrixService = TestBed.get(MatrixService);
    stateService = TestBed.get(ValidationStateService);

    matrixMock = MatrixFixture.get();
    spyOnProperty(stateService, 'state', 'get').and.returnValue({ matrix: matrixMock });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders confirmation', () => {
    expect(fixture.debugElement.queryAll(By.css('[defaultContent]')).length).toEqual(1);
    expect(fixture.debugElement.queryAll(By.css('qp-approved-content')).length).toEqual(0);
    expect(fixture.debugElement.queryAll(By.css('qp-refused-content')).length).toEqual(0);
  });

  it('approves a matrix', () => {
    spyOn(matrixService, 'setMatrixAsApproved').and.returnValue(of({ data: true }));

    fixture.debugElement.query(By.css('[approveBtn]')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(matrixService.setMatrixAsApproved).toHaveBeenCalledWith(matrixMock);

    expect(fixture.debugElement.queryAll(By.css('[defaultContent]')).length).toEqual(0);
    expect(fixture.debugElement.queryAll(By.css('qp-approved-content')).length).toEqual(1);
    expect(fixture.debugElement.queryAll(By.css('qp-refused-content')).length).toEqual(0);
  });

  it('requires changes to a matrix', () => {
    spyOn(matrixService, 'setMatrixAsRequireChanges').and.returnValue(of({ data: true }));

    fixture.debugElement.query(By.css('[requireChangesBtn]')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(matrixService.setMatrixAsRequireChanges).toHaveBeenCalledWith(matrixMock);

    expect(fixture.debugElement.queryAll(By.css('[defaultContent]')).length).toEqual(0);
    expect(fixture.debugElement.queryAll(By.css('qp-approved-content')).length).toEqual(0);
    expect(fixture.debugElement.queryAll(By.css('qp-refused-content')).length).toEqual(1);
  });

});
