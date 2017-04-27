import {Directive, ElementRef, Input, Output, EventEmitter, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[qpMask]',
})
export class MaskDirective {

  public maskString: string;

  @HostBinding('attr.placeholder') placeholder;

  @Input('qpMask') set qpMask(placeholder: string) {
    this.maskString = placeholder;
    this.placeholder = placeholder.replace(/[#9]/g, '_');
  }

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  @HostListener('input', ['$event']) onKeydown(event) {

    const newValue = event.target.value.toString().replace(/[^0-9A-Za-z]/g, '');
    let lastNumber = 0;
    const replaced = [];
    let c = 0;

    for (let i = 0; i < this.placeholder.length; i++) {
      if (this.placeholder.charAt(i) === '_' && newValue.charAt(c) !== '') {
        replaced.push(newValue.charAt(c));
        c++;
      } else {
        replaced.push(this.placeholder.charAt(i));
      }
    }

    const v = replaced.join('').toUpperCase();

    this.el.nativeElement.value = v;

    for (let i = 0; i <= v.length; i++) {
      if (/[0-9A-Za-z]/.test(v.charAt(i).toString())) {
        lastNumber = i + 1;
      }
    }

    this.ngModelChange.emit(v);

    setTimeout(() => {
      this.el.nativeElement.setSelectionRange(lastNumber, lastNumber);
    }, 1);

  }

  constructor(private el: ElementRef) {
    this.el = el;
  }

}
