import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'qp-instructions-modal',
  templateUrl: 'instructions-modal.component.html',
  styles: []
})
export class InstructionsModalComponent {
  onClose: EventEmitter<any> = new EventEmitter();
  onConfirm: EventEmitter<any> = new EventEmitter();

  constructor () {
  }

  cancel () {
    this.onClose.emit();
  }

  confirm () {
    this.onConfirm.emit();
  }
}
