/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NoConnectionModalComponent } from './no-connection-modal.component';

describe('NoConnectionModalComponent', () => {
  let component: NoConnectionModalComponent;
  let fixture: ComponentFixture<NoConnectionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoConnectionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoConnectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onConfirm when clicked', async(() => {
    spyOn(component.onConfirm, 'emit');

    fixture.debugElement.query(By.css('[proceed]')).nativeElement.click();

    expect(component.onConfirm.emit).toHaveBeenCalled();
  }));
});
