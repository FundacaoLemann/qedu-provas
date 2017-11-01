import { SearchAssessmentPageDirective } from './search-assessment-page.directive';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
      <input [qpAssessmentTokenMask] />`
})
class TestComponent { }

describe('Directive: SearchAssessmentPageDirective', () => {
  let fixture;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        SearchAssessmentPageDirective
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges();
  });

  it('should not have placeholder attribute', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const placeholder = input.nativeElement.getAttribute('placeholder');
    expect(placeholder).toBe(null);
  });

  it('should be in uppercase without blank space', () => {
    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css('input'));
      input.nativeElement.value = 'São Paulo';
      input.dispatchEvent(new Event('input'));
      const value = input.nativeElement.getAttribute('value');
      expect(value).toBe('SÃOPAULO');
    });
  });
});
