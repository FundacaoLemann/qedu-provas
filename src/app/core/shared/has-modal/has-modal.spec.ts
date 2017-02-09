/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HasModal } from './has-modal';

describe('HasModal', () => {
  let component: HasModal;
  let fixture: ComponentFixture<HasModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HasModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HasModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
