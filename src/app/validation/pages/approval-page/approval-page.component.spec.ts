import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ValidationModule } from '../../validation.module';
import { SharedModule } from '../../../shared/shared.module';
import { ApprovalPageComponent } from './approval-page.component';
import { ApplymentModule } from '../../../applyment/applyment.module';

fdescribe('ApprovalPageComponent', () => {
  let component: ApprovalPageComponent;
  let fixture: ComponentFixture<ApprovalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ValidationModule, ApplymentModule, SharedModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets matrix as approved', () => {
    expect(fixture.debugElement.queryAll(By.css('qp-approved-content')).length).toEqual(0);
    expect(fixture.debugElement.queryAll(By.css('qp-refused-content')).length).toEqual(0);

    fixture.debugElement.query(By.css('[approveBtn]')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.approved).toEqual(true);
    expect(fixture.debugElement.queryAll(By.css('[defaultContent]')).length).toEqual(0);
    expect(fixture.debugElement.queryAll(By.css('qp-approved-content')).length).toEqual(1);
    expect(fixture.debugElement.queryAll(By.css('qp-refused-content')).length).toEqual(0);
  });

});
