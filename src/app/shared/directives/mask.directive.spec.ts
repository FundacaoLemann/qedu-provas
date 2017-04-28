import { MaskDirective } from './mask.directive';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

@Component({
  template: `
      <input [qpMask]="'###-####'" id="teste" name="teste" />`
})
class TestComponent { }

describe('Directive: MaskDirective', () => {
  let fixture;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TestComponent, MaskDirective],
      schemas:      [ NO_ERRORS_SCHEMA ]
    })
      .createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should have changed the placeholder attribute', () => {
    const de = fixture.debugElement.query(By.css('input'));
    const placeholder = de.nativeElement.getAttribute('placeholder');
    expect(placeholder).toBe('___-____');
  });
});
