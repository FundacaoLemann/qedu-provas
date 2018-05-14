import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[qpAssessmentTokenMask]'
})
export class SearchAssessmentPageDirective {
  constructor(private _element: ElementRef) {
  }

  @Input() qpAssessmentTokenMask: string;

  @HostListener('input', ['$event']) onKeydown(event) {
    const position = this._element.nativeElement.selectionStart;
    this._element.nativeElement.value = event.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    this._element.nativeElement.setSelectionRange(position, position);
  }
}
