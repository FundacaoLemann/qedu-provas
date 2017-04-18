import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.sass']
})
export class ErrorModalComponent {
  @Input() message = 'nope';
  onClose = new EventEmitter<any>();

  close() {
    this.onClose.emit();
  }
}
