import { Directive, ElementRef, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[qpStudentTokenMask]',
})
export class StudentAuthenticationPageDirective {
  public maskString: string;

  @Input('qpStudentTokenMask') set qpStudentTokenMask(placeholder: string) {
    this.maskString = placeholder;
    this.placeholder = placeholder.replace(/[#9]/g, ' ');
  }

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  @HostBinding('attr.placeholder') placeholder;

  @HostListener('input', ['$event']) onKeydown(event) {
    let count = 0;
    let lastNumber = 0;
    let newValue: any = [];
    const value: string = event.target.value.replace(/[^0-9A-Za-z]/g, '').toUpperCase();

    for (let i = 0; i < this.placeholder.length; i++) {
      if (this.placeholder.charAt(i) === ' ' && value.charAt(count) !== '') {
        newValue.push(value.charAt(count));
        count++;
      } else {
        newValue.push(this.placeholder.charAt(i));
      }
    }

    newValue = newValue.join('');

    for (let i = 0; i <= newValue.length; i++) {
      if (/[0-9A-Za-z]/.test(newValue.charAt(i))) {
        lastNumber = i + 1;
      }
    }

    this.ngModelChange.emit(newValue);
    this._element.nativeElement.value = newValue;

    setTimeout(() => this._element.nativeElement.setSelectionRange(lastNumber, lastNumber), 1);
  }

  constructor(private _element: ElementRef) {
    this._element = _element;
  }
}
