/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReviewModalComponent } from './review-modal.component';
import { dispatchEvent } from '../../../testing/form-helper';

describe('ReviewModalComponent', () => {
  let component: ReviewModalComponent;
  let fixture: ComponentFixture<ReviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClose when click on cancel button', () => {
    spyOn(component.onClose, 'emit');
    dispatchEvent(fixture, '[close-button]', 'click');
    expect(component.onClose.emit).toHaveBeenCalled();
  });
});
