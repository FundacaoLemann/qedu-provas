import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'qp-review-modal',
  templateUrl: 'review-modal.component.html',
  styleUrls: ['review-modal.component.sass']
})
export class ReviewModalComponent {
  onCancel = new EventEmitter<null>();
  onConfirm = new EventEmitter<null>();
  isSubmitting = false;

  confirm () {
    this.onConfirm.emit();
  }

  cancel () {
    this.onCancel.emit();
  }
}
