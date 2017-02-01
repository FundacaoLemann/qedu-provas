import { Component, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instructions-modal',
  templateUrl: 'instructions-modal.component.html',
  styleUrls: ['instructions-modal.component.sass']
})
export class InstructionsModalComponent {
  onClose: EventEmitter<any> = new EventEmitter();
  onConfirm: EventEmitter<any> = new EventEmitter();

  constructor () {
  }

  close () {
    this.onClose.emit();
  }

  confirmStart () {
    this.onConfirm.emit();
  }
}
