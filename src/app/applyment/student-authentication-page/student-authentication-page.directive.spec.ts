import { StudentAuthenticationPageDirective } from './student-authentication-page.directive';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
      <input [qpStudentTokenMask]="'###-####'" />`
})
class TestComponent { }

describe('Directive: StudentAuthenticationPageDirective', () => {
  let fixture;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        StudentAuthenticationPageDirective
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges();
  });

  it('should have changed the placeholder attribute', () => {
    const imput = fixture.debugElement.query(By.css('input'));
    const placeholder = imput.nativeElement.getAttribute('placeholder');
    expect(placeholder).toBe('   -    ');
  });
});
